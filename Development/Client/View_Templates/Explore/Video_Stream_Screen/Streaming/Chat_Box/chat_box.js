import React, { Component, createRef } from 'react';
import Message from './Message/message.js';
import Text_Input from './Text_Input/text_input.js';
import Viewer_Display from './Viewer_Display/viewer_display.js';
import './chat_box.less';

class Chat_Box extends Component {

    chat_box_ref = createRef();
    textRef = createRef();

    constructor(props) {

        super(props);

        Chat_Box.contextType = window.Context;

        this.added_event = false; //To make sure it only adds the event once
        
        this.state = {
            conversation: [],
            socket: this.props.socket,
            my_room_tag: this.props.my_room_tag,
            account_data: this.props.account_data,
            the_host: this.props.the_host
        };
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        await this.setState(this.props);

        if(!this.added_event && this.state.socket){
            this.Add_Socket_Events(this.state.socket);
        }
        
    }

    componentDidMount() {
        
        let { Drag } = this.context;

        this.drag = new Drag();

        if(!this.added_event && this.state.socket){
            this.Add_Socket_Events(this.state.socket);
        }
    }

    Add_Socket_Events = (socket) => {

        socket?.on('receive_new_text', async ({from_room_tag, text, from_account }) => {

            let new_text_obj = {};

            for (let i in from_room_tag) {
                new_text_obj[i] = from_room_tag[i];
            }

            new_text_obj.profile_picture_link = from_account.profile_picture_link;
            new_text_obj.text = text;
            new_text_obj.timestamp = this.Get_Current_Local_Time();

            this.state.conversation.push(new_text_obj);

            await this.setState({ conversation: this.state.conversation });

            setTimeout(()=>{
                this.textRef.current.scrollTo({
                    top: this.textRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 250);

        });

        this.added_event = true;
    }

    Get_Current_Local_Time = () => {

        let now = new Date();

        return now.toLocaleTimeString();

    }
    
    Generate_Go_Live_Button = (my_tag) => {
        
        return my_tag?.is_host ? <></> : <div className="button-wrapper" id="go-live">

                                            <div id="button" onClick={(e)=>{this.Request_To_Go_Live(my_tag);}}>

                                                Go Live

                                            </div>

                                        </div>;
    }
    
    Request_To_Go_Live = (my_tag) => {
        
        let {the_host} = this.state;
        
        this.props.socket.emit('request_to_go_live', {host: the_host, from: this.state.my_room_tag});
        
    }

    render() {


        return (
            <div id="chat-box" ref={this.chat_box_ref}>
    
                <div id="top-bar">

                    <div id="drag-bar"
                        onMouseDown={(e) => { this.drag.init_child(e, this.chat_box_ref.current); }}
                        onMouseUp={(e) => { this.drag.disable_drag(e); }}
                    >

                        Drag here

                    </div>

                    <div id="buttons-area">

                        {this.Generate_Go_Live_Button(this.state.my_room_tag)}

                    </div>

                </div>
                
                <div id="lower-area">
                
                    <div id="chat-area">

                        <div id="text" ref={this.textRef}>

                            {this.state.conversation.map((value, index) => {

                                return <div className="message-wrapper" key={index}>

                                    <Message data={value} my_room_tag={this.state.my_room_tag} />

                                </div>;

                            })}

                        </div>

                        <div id="controls">

                            <Text_Input socket={this.state.socket} my_room_tag={this.state.my_room_tag} account_data={this.state.account_data} />

                        </div>
                        
                    </div>
                    
                    <div id="viewer-display-area">
                        
                        <Viewer_Display 
                            socket={this.state.socket} 
                            my_account_data={this.state.account_data}
                            my_room_tag={this.state.my_room_tag}
                            set_account_view={this.props.set_account_view}
                        />
                        
                    </div>
                
                </div>

            </div>
        );
    }
}

export default Chat_Box;