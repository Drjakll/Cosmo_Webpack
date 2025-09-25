import React, {Component, createRef} from 'react';
import Search from './Search/search.js';
import Current from './Current/current.js';
import Find_New from './Find_New/find_new.js';
import './popup_editor.less';

class Popup_Editor extends Component {
    
    resultRef = createRef();

    constructor(props){
        
        super(props);

        let {account_data, popup_type} = this.props;

        this.state = {
            account_data: account_data,
            popup_type: popup_type
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Apply_Search = (requirements)=>{

        this.resultRef.current?.Apply_Search(requirements);
        
    }

    Popup_Types = {
        "Find_New": Find_New,
        "Current": Current
    }
    
    render(){

        const Popup_Type = this.Popup_Types[this.state.popup_type];

        
        return (
            <div id="connections-popup-editor">

                <div id="close-button" onClick={this.props.release_popup}></div>

                <div id="the-connections-editor">

                    <div id="search-wrapper">

                        <Search account_data={this.state.account_data} Apply_Search={this.Apply_Search} Profile_Thumbnail={this.props.Profile_Thumbnail}/>

                    </div>

                    <div id="result-wrapper">

                        <Popup_Type ref={this.resultRef} account_data={this.state.account_data} Profile_Thumbnail={this.props.Profile_Thumbnail}/>

                    </div>
                    
                </div>

            </div>
        );
    }
}

export default Popup_Editor;