import React, {Component} from 'react';
import Popup_Editor from './Popup_Editor/popup_editor.js';
import './connections_editor.less';

class Connections_Editor extends Component {
    
    constructor(props){
        
        super(props);

        let {account_data} = this.props;

        Connections_Editor.contextType = window.Context;

        this.state = {
            account_data: account_data,
            show_popup: false,
            popup_type: "Edit"
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    Release_Popup = (e)=>{
        this.setState({show_popup: false});
    }

    Show_Popup = (type)=>{

        this.setState({show_popup: true, popup_type: type});

    }
    
    render(){
        
        return (
            <div id="connections-editor">

                {this.state.show_popup ? 
                <div id="connections-editor-popup-wrapper">
                    <Popup_Editor account_data={this.state.account_data} release_popup={this.Release_Popup} popup_type={this.state.popup_type} Profile_Thumbnail={this.props.Profile_Thumbnail}/>
                    </div> 
                : <></>}

                <div className="connections-editor-button" onClick={(e)=>{this.Show_Popup("Current");}}>

                    Edit
                    
                </div>

                <div className="connections-editor-button" onClick={(e)=>{this.Show_Popup("Find_New");}}>
                    
                    Search

                </div>

            </div>
        );
    }
}

export default Connections_Editor;