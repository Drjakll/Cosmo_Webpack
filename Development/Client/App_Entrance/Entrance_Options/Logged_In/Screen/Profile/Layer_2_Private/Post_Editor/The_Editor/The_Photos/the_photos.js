import React, { Component, createRef } from 'react';
import Popup_Msg from '@popup_message';
import Request_URLs from '@request_urls';
import Image_Container from '@image_container';
import Upload_Files_To_S3 from '@upload_files_to_s3';
import './the_photos.less';

class The_Photos extends Component {

    fileRef = createRef();

    //Selected photos for deleting
    selected_photos = {};

    upload_in_progress = false; 

    constructor(props) {

        super(props);

        let { photos, owner_user_account, post_info } = props;


        this.state = {
            photos: photos ? photos : [],
            owner_user_account,
            post_info: post_info ? post_info : {}
        };
    }

    componentDidMount() {

        this.Get_Post_Photos();

    }

    Modify_Photos = (photos)=>{

        for(let i = 0; i < photos.length; i++){

            photos[i].custom_frame = this.Single_Photo_Display;

        }

        return photos;

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

        let { upload_photos } = Request_URLs;

        let { owner_user_account, post_info } = this.state;
        let { id } = owner_user_account;

        if (!post_info || !post_info.id) {
            await Popup_Msg("message", "Please save the post before adding photos.");
            return;
        }

        let {id: target_id} = post_info;

        let album_name = post_info.created_on;

        this.upload_in_progress = true;

        await Upload_Files_To_S3(upload_photos, 
                                files, 
                                { user_id: id, target_id_type: "post_id", target_id, album_name },
                                this.Update_Upload_Progress
                            );
        
        this.Get_Post_Photos();
        
        this.upload_in_progress = false;
    }

    upload_progress_added_keys = {};

    Update_Upload_Progress = ({key, url, progress_completed, all_completed})=>{

        if(all_completed){

            this.upload_progress_added_keys = {};

            return;
        }

        let {photos} = this.state;

        //Check whether or not it's already pushed into the array
        if(!this.upload_progress_added_keys[key]){

            this.upload_progress_added_keys[key] = true;

            let to_add = {id: key, link: url, completed: progress_completed};

            photos.push(to_add)
        }

        photos = photos.map((value, index)=>{

            if(value.id === key){
                value.completed = progress_completed;
            }

            return value;

        });

        this.setState({photos});
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

        photos = this.Modify_Photos(photos);

        await this.setState({
            photos
        });

        this.props.Set_Post_Photos(photos);
    }


    Single_Photo_Display = ({photo, index}) => {

        let { link, id } = photo;
        let { aws_s3_url } = Request_URLs;

        let {selected_photos} = this;

        let Select_Photo = (e) => {

            let {currentTarget} = e;

            currentTarget.classList.toggle('selected-photo');

            if(selected_photos[id]){

                delete selected_photos[id];

            } else {

                selected_photos[id] = photo;

            }

            this.props.Set_Selected_Photos(selected_photos);

        }

        return <div className="single-photo-wrapper" key={index}>

            <img src={`${aws_s3_url}${link}`}
                alt={`Post Photo ${id}`}
                className={`single-photo`}
                onClick={(e) => {
                    Select_Photo(e);
                }} />
                                                
        </div>;
    }

    Delete_Selected_Photos = async (e) => {

        let { delete_photos } = Request_URLs;
        let { photos } = this.state; 
        let {selected_photos } = this;

        let res = await (await fetch(delete_photos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({photos: selected_photos})
        })).json();

        await Popup_Msg("message", res?.message);

        photos = photos.filter((p)=>{

            for(let i in selected_photos){
                if(selected_photos[i].id === p.id){
                    return false;
                }
            }

            return true;
        });

        selected_photos = {};

        this.setState({ photos });

        this.props.Set_Selected_Photos(selected_photos);
 
    }

    render() {

        let {photos} = this.state;

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

                    <Image_Container images={photos} columns={4} />

                </div>

            </div>

        </div>;
    }
}

export default The_Photos;