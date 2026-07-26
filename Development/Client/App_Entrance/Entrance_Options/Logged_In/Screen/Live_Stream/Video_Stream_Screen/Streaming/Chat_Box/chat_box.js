import React, { Component, createRef } from 'react';
import Message from './Message/message.js';
import Text_Input from './Text_Input/text_input.js';
import Viewer_Display from './Viewer_Display/viewer_display.js';
import Popup_Msg from '@popup_message';
import Drag from '@drag';
import './chat_box.less';

class Chat_Box extends Component {

    chat_box_ref = createRef();
    textRef = createRef();

    streaming_status = {
        not_streaming: "Not Streaming",
        requested: "Requested",
        streaming: "Streaming"
    }

    MAX_CO_STREAMERS = 3; //Max number of co-streamers allowed (not including the host)

    constructor(props) {

        super(props);

        this.added_event = false; //To make sure it only adds the event once
        
        this.state = {
            conversation: [],
            socket: this.props.socket,
            my_room_tag: this.props.my_room_tag,
            owner_user_account: this.props.owner_user_account,
            the_host: this.props.the_host,
            streaming_status: this.props.streaming_status,
            co_streamers: this.props.co_streamers
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

    End_Streaming = (my_tag)=>{
        
        this.props.change_screen('Stream_List_Components', false, null);
        
    }

    Generate_Button = (my_tag) => {

        let {streaming_status : status, owner_user_account, the_host} = this.state;
        let {not_streaming, requested} = this.streaming_status;

        return my_tag?.is_host ? <div className="button-wrapper" id="go-live">

                                    <div className="button" onClick={(e)=>{this.End_Streaming(my_tag);}}>

                                        End Stream

                                    </div>

                                </div> 
                                : 
                                <div className="button-wrapper" id="go-live">

                                    <div className="button" onClick={(e)=>{this.Request_To_Go_Live(my_tag);}}>

                                        {status === not_streaming ?  "Go Live" : (status == requested ? "Pull Request" : "Stop Streaming")}

                                    </div>

                                    {
                                        owner_user_account.id != the_host?.id ? 
                                        <div className="button" onClick={(e)=>{this.Leave_Stream(my_tag);}}>

                                            Leave

                                        </div>
                                        : ""
                                    }

                                </div>;
    }
    
    Request_To_Go_Live = (my_tag) => {
        
        let {the_host, streaming_status : status, co_streamers} = this.state;
        let {not_streaming, requested} = this.streaming_status;

        let request_route = status === not_streaming ? "request_to_go_live" : (status === requested ? "pull_request_to_live" : "stop_streaming");

        if (request_route === "request_to_go_live" && Object.keys(co_streamers).length >= (this.MAX_CO_STREAMERS + 1)) //+1 because co_streamers doesn't include the host, but we want to count the host in the total number of streamers
        {
            Popup_Msg("message", `Sorry, you cannot go live at the moment because the stream already has ${this.MAX_CO_STREAMERS} co-streamers. Please try again later.`);
            return;
        }

        this.props.socket.emit(request_route, {host: the_host, from: my_tag});

        this.setState({
            streaming_status: status === not_streaming ? requested : not_streaming
        });
        
    }

    Leave_Stream = (my_tag)=>{

        this.props.change_screen('Stream_List_Components', false, null);

    }

    render() {


        return (
            <div id="chat-box" ref={this.chat_box_ref}>
    
                <div id="top-bar">

                    <div id="buttons-area">

                        {this.Generate_Button(this.state.my_room_tag)}

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

                            <Text_Input socket={this.state.socket} my_room_tag={this.state.my_room_tag} owner_user_account={this.state.owner_user_account} />

                        </div>
                        
                    </div>
                    
                    <div id="viewer-display-area">
                        
                        <Viewer_Display 
                            socket={this.state.socket} 
                            my_account_data={this.state.owner_user_account}
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