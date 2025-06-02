import React, {Component} from 'react';
import './editor.less';

class Editor extends Component {
    
    constructor(props){
        
        super(props);
        
        Editor.contextType = window.Context;
        
        let {account_data} = this.props;
        
        this.state = {
            account_data: account_data,
            profile_pictures: []
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
        
        console.log(this.state.account_data);
        
        
        let res = await fetch(get_all_profile_pictures, {
            method: "POST",
            body: JSON.stringify({email: email} ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        let resJson = await res.json();
        
        console.log(resJson);
        
        if(resJson){
            
            this.setState({profile_pictures: resJson.profile_photos});
            
        } else {
            
            alert(`${resJson?.message}`);
        }
    }
    
    render(){
        
        let {profile_pictures} = this.state;
        let {Request_URLs} = this.context;
        
        let {aws_s3_url} = Request_URLs;
        
        return <div id="the-editor-profile-photo">
        
            <div id="the-exit-button-profile-photo-editor" onClick={(e)=>{this.props.exit_editor(); }}>
                
                
                
            </div>
            
            <div id="the-profile-pictures-editor">
            
                <div id="profile-picture-collection-label">
                
                    Profile Pictures Collection

                </div>
            
                <div id="profile-picture-collection">

                    {profile_pictures.map((picture, index)=>{

                        let {url} = picture;

                        let full_url = `${aws_s3_url}${url}`;

                        return <div className="individual-picture-wrapper" key={index}>

                                <div id="picture-wrapper">

                                    <div id="the-picture" style={{
                                        backgroundImage: `url('${full_url}')`
                                    }}>

                                </div>
                                
                                <div id="the-buttons">
                                        
                                    <div id="button">
                                        
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