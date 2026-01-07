import React, {Component} from 'react';
import Popup_Editor from './Popup_Editor/popup_editor.js';
import {Connections} from '@profile_template/profile_template.js';
import './connections_editor.less';

class Connections_Editor extends Connections {
    
    constructor(props){
        
        super(props);

        let {owner_user_account, connection_list} = this.props;

        Connections_Editor.contextType = window.Context;

        let state = {
            owner_user_account,
            connection_list,
            show_popup: false,
            popup_type: "Edit"
        };

        for(let key in state){
            this.state[key] = state[key];
        }
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        super.componentDidUpdate(prevProps, prevState);
        
    }

    Release_Popup = (e)=>{
        this.setState({show_popup: false});
    }

    Show_Popup = (type)=>{

        this.setState({show_popup: true, popup_type: type});

    }

    Legacy = () =>{ 

        return <div id="connections-editor">

            {this.state.show_popup ? 
            <div id="connections-editor-popup-wrapper">
                <Popup_Editor account_data={this.state.owner_user_account} 
                            release_popup={this.Release_Popup} 
                            popup_type={this.state.popup_type} 
                            Profile_Thumbnail={this.props.Profile_Thumbnail} 
                            connection_list={this.state.connection_list}/>
                </div> 
            : <></>}

            <div className="connections-editor-button" onClick={(e)=>{this.Show_Popup("Current");}}>

                <div id="friends-icon" className="icon" style={{backgroundImage: `url(./static/friends_icon.png)`}}></div>

                <label>Edit</label>
                
            </div>

            <div className="connections-editor-button" onClick={(e)=>{this.Show_Popup("Find_New");}}>

                <div id="friends-search-icon" className="icon" style={{backgroundImage: `url(./static/friends_search_icon.png)`}}></div>

                <label>Search</label>

            </div>

        </div>;
    }
    
    render(){
        
        return (
            <div id="connections-editor">

                {super.render()}

            </div>
        );
    }
}

export default Connections_Editor;