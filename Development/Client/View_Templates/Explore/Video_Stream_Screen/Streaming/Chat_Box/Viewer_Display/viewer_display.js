import React, { Component } from 'react';
import Viewer_Entry from './Viewer_Entry/viewer_entry.js';
import './viewer_display.less';

class Viewer_Display extends Component {

    constructor(props){

        super(props);

        let {my_account_data, my_room_tag, socket} = this.props;  

        Viewer_Display.contextType = window.Context;

        this.state = {
            my_account_data: my_account_data,
            my_room_tag: my_room_tag,
            socket: socket,
            participants: {}
        };
    }

    componentDidMount(){

        let {socket} = this.state;

        this.Setup_Socket_Event(socket);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        let {my_account_data, my_room_tag} = this.props;

        let {participants} = this.state;

        if(!my_room_tag){
            return;
        }

        participants[my_room_tag.id] = {account_data: my_account_data, room_tag: my_room_tag};

        this.setState({participants: participants});
    }

    Setup_Socket_Event = (socket)=>{


        socket?.on('new_viewer_enter_chat', ({account_data, room_tag})=>{

            let {participants, my_room_tag, my_account_data} = this.state;

            participants[room_tag.id] = {account_data: account_data, room_tag: room_tag};

            this.setState({participants: participants});

            socket.emit('acknowledge_new_viewer', {to_room_tag: room_tag, 
                from_tag: my_room_tag, 
                from_account: my_account_data
            });

        });

        socket?.on('received_knowledgement', ({from_tag, from_account})=>{

            let {participants} = this.state;

            participants[from_tag.id] = {account_data: from_account, room_tag: from_tag, request_live: false};

            this.setState({participants: participants});     

        });

        socket?.on('acknowledge_request_to_go_live', async ({from})=>{

            let {participants} = this.state;
            let {id} = from;
            
            if(participants[id] !== undefined){
                
                participants[id].request_live = true;
                
                this.setState({participants: participants});
                
            }

        });            

        socket?.on('leave_chat_room', ({room_tag})=>{

            let {participants} = this.state;

            delete participants[room_tag.id];

            this.setState({participants: participants});

        });
    }

    render(){

        let {participants} = this.state;

        return <div id="viewer-display">

            <div id="the-list">

                {Object.keys(participants).map((key, ind)=>{

                    let {account_data, room_tag, request_live} = participants[key];

                    return <div className="participant-entry-wrapper" 

                                key={ind} 

                                onClick={(e)=>{

                                    this.props.set_account_view(account_data);

                                }}
                            >

                        <Viewer_Entry account_data={account_data} 
                                    room_tag={room_tag} 
                                    request_live={request_live} 
                                    socket={this.state.socket}/>

                    </div>;

                })}

            </div>

        </div>;
    }

}

export default Viewer_Display;