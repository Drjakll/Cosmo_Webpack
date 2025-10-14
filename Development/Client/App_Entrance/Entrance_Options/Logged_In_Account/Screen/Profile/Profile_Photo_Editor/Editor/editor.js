import React, {Component, createRef} from 'react';
import './editor.less';

class Editor extends Component {
    
    constructor(props){
        
        super(props);
        
        Editor.contextType = window.Context;
        
        let {account_data} = this.props;
        
        this.state = {
            account_data: account_data,
            profile_pictures: [],
            selected_to_delete: {}
        };
    }
    
    componentDidMount(){
        
        this.Get_All_Profile_Pictures();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Get_All_Profile_Pictures = async () => {
        
        let {Request_URLs} = this.context;
        
        let {get_all_profile_pictures} = Request_URLs;
        
        let {email} = this.state.account_data;
        
        
        let res = await fetch(get_all_profile_pictures, {
            method: "POST",
            body: JSON.stringify({email: email} ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        let resJson = await res.json();
        
        if(resJson){
            
            this.setState({profile_pictures: resJson.profile_photos});
            
        } else {
            
            alert(`${resJson?.message}`);
        }
    }

    Update_Profile_Photo = async (photo_url) => {

        let { Request_URLs, Cookie_Tools, Configurations } = this.context;

        let { cookie_converter } = Cookie_Tools;

        let { set_as_profile_picture } = Request_URLs;

        let { account_data } = this.state;

        let res = await fetch(set_as_profile_picture, {
            method: "POST",
            body: JSON.stringify({
                src_path: photo_url,
                account_details: account_data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resJson = await res.json();

        if (resJson) {

            //Update the cookie in the local machine to avoid sending another request to the server

            account_data.profile_picture_link = photo_url;

            let date = new Date();

            date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);

            const cookieStrs = cookie_converter(account_data, { "expires": date.toUTCString(), "path": "/" });

            for (let cookieStr of cookieStrs) {
                document.cookie = cookieStr;
            }

            //Refresh the account data by pulling the cookie data

            const { refresh_account_data } = this.props;

            refresh_account_data();
        }
    }

    Upload_Profile_Pictures = async (files) => {

        const { Request_URLs, Upload_Files_To_S3 } = this.context;

        let jsonBody = { email: this.state.account_data.email, album: "Profile Pictures" };

        let resData = await Upload_Files_To_S3(Request_URLs.upload_photos, files, jsonBody);

        if (resData) {

            let body = { url: resData.photo_urls[0], belongs_to_user_email: this.state.account_data.email };

            let res = await fetch(Request_URLs.insert_profile_photo_data, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let resJson = await res.json();

            if (resJson) {
                alert(resJson.message);

                this.Get_All_Profile_Pictures();
            }

        }
    }

    Select_To_Delete = (photo_data) => {

        if (!photo_data) {
            return;
        }

        let { selected_to_delete } = this.state;
        let { id } = photo_data;

        if (selected_to_delete[id]) {

            delete selected_to_delete[id];

        } else {

            selected_to_delete[id] = photo_data;
        }

        this.setState({ selected_to_delete: selected_to_delete });
    }

    Delete_Selections = async () => {

        let { selected_to_delete } = this.state;

        const { Request_URLs } = this.context;
        const { delete_profile_photo_files, delete_database_profile_photos } = Request_URLs;

        let body = { photos: selected_to_delete };

        let res = await fetch(delete_profile_photo_files,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        let resJson = await res.json();

        if (resJson) {

            let res2 = await fetch(delete_database_profile_photos, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let res2Json = await res2.json();

            alert(res2Json?.message);

            this.Get_All_Profile_Pictures();

        } else {
            alert("Error sending request to delete files");
        }

        this.setState({
            selected_to_delete: {}
        });
    }
    
    render(){
        
        let {profile_pictures} = this.state;
        let {Request_URLs} = this.context;
        
        let { aws_s3_url } = Request_URLs;

        let fileRef = createRef();
        
        return <div id="the-editor-profile-photo">
        
            <div id="the-exit-button-profile-photo-editor" onClick={(e)=>{this.props.exit_editor(); }}>
                
                
                
            </div>
            
            <div id="the-profile-pictures-editor">

                <div id="profile-picture-collection-label">
            
                    Profile Pictures Collection

                </div>

                <div id="top">

                    <div id="upload-profile-pictures-wrapper">

                        <input type="file" ref={fileRef} accept="image/*" />

                        <button onClick={(e) => {

                            this.Upload_Profile_Pictures(fileRef.current.files);

                        }}>Upload</button>

                    </div>

                    <div id="delete-selected-pictures-wrapper">

                        <button onClick={(e) => { this.Delete_Selections(); } }>Delete Selections</button>

                    </div>

                </div>
            
                <div id="profile-picture-collection">

                    {profile_pictures.map((picture, index)=>{

                        let {url,id} = picture;

                        let full_url = `${aws_s3_url}${url}`;

                        return <div className="individual-picture-wrapper" key={index}>

                                <div id="picture-wrapper">

                                    <div id="the-picture" style={{
                                        backgroundImage: `url('${full_url}')`
                                    }}>

                                </div>
                                
                                <div id="the-buttons">

                                    <div id="delete-selection" className={`${this.state.selected_to_delete[id] ? "delete-selected" : ""}`}
                                        onClick={(e) => { this.Select_To_Delete(picture); } }
                                    >

                                        Select to Delete
                                        
                                    </div>

                                    <div id="set-as-profile-button" onClick={(e) => { this.Update_Profile_Photo(url); }}>
                                        Set as Profile Picture
                                    </div>
                                        
                                </div>

                            </div>

                        </div>;
                    })}

                </div>

            </div>
        
        </div>;
    }
}

export default Editor;