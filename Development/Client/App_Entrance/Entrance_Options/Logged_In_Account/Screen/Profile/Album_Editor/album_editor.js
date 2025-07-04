import React, {Component} from 'react';
import Photos_Container_Editor from './Photos_Container_Editor/photos_container_editor.js';
import './album_editor.less'

class Album_Editor extends Component {

    static Photos_Container_Editor = Photos_Container_Editor
    
    constructor(props){
        
        super(props);

        Album_Editor.contextType = window.Context;
        
        this.state = {};

        for(let i in props){
            this.state[i] = props[i];
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps === this.props){
            return;
        }

        this.setState(this.props);
    }

    Add_Photo_Album = async (e)=>{

        let {account_data} = this.state;
        let {Photo_Album_Data_Templates, Request_URLs} = this.context;
        let {Photo_Album_Data} = Photo_Album_Data_Templates;
        let {add_photo_album} = Request_URLs;


        let param = Photo_Album_Data({title: "Untitled Album", brief_description: "My adventure", owner_email: account_data.email});

        if(!account_data){
            return;
        }

        let resJson = await (await fetch(add_photo_album, {
            method: "POST",
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        console.log(resJson?.message);

        this.props.get_albums();
    }
    
    render(){
        
        return <div id="album-editor">
        
             <div id="add-button" onClick={this.Add_Photo_Album}>
                New Album
             </div>
        
        </div>;
    }
    
}

export default Album_Editor;