import React, { Component, createRef } from 'react';
import './the_photos.less';

class The_Photos extends Component {

    fileRef = createRef()

    constructor(props) {

        super(props);

        let { photos, owner_user_account, post_info } = props;

        The_Photos.contextType = window.Context;

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

        let files = this.fileRef.current.files;

        if (files.length === 0) {
            return;
        }

        let { Request_URLs, Upload_Files_To_S3 } = this.context;
        let { upload_photos, get_photo_links } = Request_URLs;

        let { owner_user_account, post_info } = this.state;
        let { id } = owner_user_account;

        if (!post_info || !post_info.id) {
            alert("Please save the post before adding photos.");
            return;
        }

        let {id: target_id} = post_info;

        let album_name = post_info.created_on;

        await Upload_Files_To_S3(upload_photos, files, { user_id: id, target_type: "post", target_id, album_name });

        this.Get_Post_Photos();
    }

    Get_Post_Photos = async () => {

        let { post_info } = this.state;

        if (!post_info || !post_info.id) { 
            return;
        }

        let body ={
            target_id: post_info.id,
            target_type: "post"
        }

        let { get_photo_links } = this.context.Request_URLs;

        let res = await (await fetch(get_photo_links, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })).json();
        
        if (res && res.results.length > 0) {

            this.setState({
                photos: res.results
            });

            this.props.Set_Post_Photos(res.results);
        }
    }

    Single_Photo_Display = (photo, key) => {

        let { link, id } = photo;
        let { aws_s3_url } = this.context.Request_URLs;

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

        let { delete_post_photo_links, delete_photo_files } = this.context.Request_URLs;
        let { selected_photos } = this.state; 

        //Delete the entries from database
        let res = await (await fetch(delete_post_photo_links, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selected_photos)
        })).json();


        //Delete the actual files from s3
        let res2 = await (await fetch(delete_photo_files, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ photos: selected_photos })
        })).json();

        await this.Get_Post_Photos();

        this.setState({ selected_photos: {} });
 
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