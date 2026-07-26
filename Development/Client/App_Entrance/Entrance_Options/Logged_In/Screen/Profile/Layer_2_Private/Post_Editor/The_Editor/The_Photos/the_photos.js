import React, { Component, createRef } from 'react';
import Popup_Msg from '@popup_message';
import Request_URLs from '@request_urls';
import Upload_Files_To_S3 from '@upload_files_to_s3';
import './the_photos.less';

class The_Photos extends Component {

    fileRef = createRef();

    upload_in_progress = false; 

    constructor(props) {

        super(props);

        let { photos, owner_user_account, post_info } = props;


        this.state = {
            photos: photos ? photos : [],
            owner_user_account,
            post_info: post_info ? post_info : {},
            selected_photos: {}
        };
    }

    componentDidMount() {

        this.Get_Post_Photos();

    }

    async componentDidUpdate(prevProps, prevState) {  

        if (this.props === prevProps) {
            return;

        }

        await this.setState(this.props);
    }

    Upload_Photos = async (e) => {

        if(this.upload_in_progress){
            Popup_Msg("message","Upload in progress, \nplease wait for it to finish \nbefore uploading more photos.");
            return;
        }

        let files = this.fileRef.current.files;

        if (files.length === 0) {
            return;
        }

        let { upload_photos, get_photo_links } = Request_URLs;

        let { owner_user_account, post_info } = this.state;
        let { id } = owner_user_account;

        if (!post_info || !post_info.id) {
            await Popup_Msg("message", "Please save the post before adding photos.");
            return;
        }

        let {id: target_id} = post_info;

        let album_name = post_info.created_on;

        this.upload_in_progress = true;

        await Upload_Files_To_S3(upload_photos, files, { user_id: id, target_id_type: "post_id", target_id, album_name });

        this.Get_Post_Photos();
        
        this.upload_in_progress = false;
    }

    Get_Post_Photos = async () => {

        let { post_info } = this.state;

        if (!post_info || !post_info.id) { 
            return;
        }

        let body ={
            target_id: post_info.id,
            target_id_type: "post_id"
        }

        let { get_photo_links } = Request_URLs;

        let res = await (await fetch(get_photo_links, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })).json();

        let {targets: photos} = res?.results ?? {targets: []};
        
        if (photos.length > 0) {

            this.setState({
                photos: photos
            });

            this.props.Set_Post_Photos(photos);
        }
    }

    Single_Photo_Display = (photo, key) => {

        let { link, id } = photo;
        let { aws_s3_url } = Request_URLs;

        let Select_Photo = (photo) => {

            let { selected_photos } = this.state;

            if (selected_photos[photo.id]) {

                delete selected_photos[photo.id];

            } else {

                selected_photos[photo.id] = photo;
            }

            this.setState({ selected_photos: selected_photos });

            this.props.Set_Selected_Photos(selected_photos);
        }

        return <div className="single-photo-wrapper" key={key}>

            <img src={`${aws_s3_url}${link}`}
                alt={`Post Photo ${id}`}
                className={`single-photo ${this.state.selected_photos[photo.id] ? "selected-photo" : ""}`}
                onClick={(e) => {
                    Select_Photo(photo);
                }} />
                                                
        </div>;
    }

    Delete_Selected_Photos = async (e) => {

        let { delete_photos } = Request_URLs;
        let { selected_photos, photos } = this.state; 

        let res = await (await fetch(delete_photos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({photos: selected_photos})
        })).json();

        Popup_Msg("message", res?.message);

        photos = photos.filter((p)=>{
            for(let i in selected_photos){
                if(selected_photos[i].id === p.id){
                    return false;
                }
            }
        });

        this.setState({ selected_photos: {}, photos });
 
    }

    render() {

        return <div id="the-post-photos-holder">

            <div id="top">

                <div id="file-upload-wrapper">

                    <input type="file" id="file-upload" accept="image/*" multiple ref={this.fileRef} />

                    <button onClick={this.Upload_Photos}>Upload</button>

                    <button onClick={this.Delete_Selected_Photos}>Delete Photos</button> 

                </div>

            </div>

            <div id="bottom">

                <div id="photos-wrapper">

                    {this.state.photos.map((photo_data, index) => {

                        return this.Single_Photo_Display(photo_data, index);

                    }) }

                </div>

            </div>

        </div>;
    }
}

export default The_Photos;