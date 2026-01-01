import React, {Component} from 'react';
import './comment_input.less';

class Comment_Input extends Component {

    text = ""

    constructor(props){

        super(props);

        
    }

    Submit_Message = ()=>{

    }

    render(){

        return (<div id="comment-input-wrapper">

            <div id="input-wrapper">

                <div id="textarea-wrapper">

                    <textarea onChange={(e)=>{ this.text = e.target.value; }} 
                        onKeyDown={(e)=>{

                            if(e.key !== "Enter"){
                                return;
                            }

                            e.target.value = "";

                            this.Submit_Message();

                        }}></textarea>

                </div>

                <div id="send-button-wrapper">

                    <div id="send-button" onClick={this.Submit_Message}>

                        Send
                        
                    </div>

                </div>

            </div>

        </div>);
    }
}

export default Comment_Input;