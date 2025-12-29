import React, {Component} from 'react';
import Photos_Container_Editor from './Photos_Container_Editor/photos_container_editor.js';
import Context from '@context/context.js';
import  {Albums} from '@profile_template';
import './album_editor.less';

let {Albums: Albums_Component} = Albums;

class Album_Editor extends Albums_Component {
    
    constructor(props){
        
        super(props);

        Album_Editor.contextType = Context;

        for(let i in props){
            this.state[i] = props[i];
        }

        this.Photos_Container = Photos_Container_Editor
    }

    componentDidMount(){

        super.componentDidMount();

    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps === this.props){
            return;
        }

        super.componentDidUpdate(prevProps, prevState);
    }

    Add_Photo_Album = async (e) => {

        let album_name = prompt("Please enter an album name.");

        if (!album_name) {
            return;
        }

        let {owner_user_account} = this.state;
        let {Photo_Album_Data_Templates, Request_URLs} = this.context;
        let {Photo_Album_Data} = Photo_Album_Data_Templates;
        let {add_album} = Request_URLs;


        let param = Photo_Album_Data({title: album_name, brief_description: "My adventure", user_id: owner_user_account.id});

        if(!owner_user_account){
            return;
        }

        let result = await (await fetch(add_album, {
            method: "POST",
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        if(result.failed){
            alert(result.message);
            return;
        }

        this.Get_Albums();
    }
    
    render(){
        
        return <div id="album-editor">
        
            <div id="add-button" onClick={this.Add_Photo_Album}>

                <div id="new-album-icon" style={{backgroundImage: `url(./static/add_album_icon.png)`}}></div>

                <label>Add Album</label> 

            </div>

            {super.render()}
        
        </div>;
    }
    
}

export default Album_Editor;