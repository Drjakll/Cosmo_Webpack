import React, { Component } from 'react';
import Viewer_Entry from './Viewer_Entry/viewer_entry.js';
import './viewer_display.less';

class Viewer_Display extends Component {

    Finished_Setup_Socket = false;

    constructor(props){

        super(props);

        let {my_account_data, my_room_tag, socket} = this.props;  

        Viewer_Display.contextType = window.Context;

        this.state = {
            my_account_data,
            my_room_tag,
            socket,
            participants: {}
        };
    }

    componentDidMount(){

        let {socket} = this.state;

        this.Setup_Socket_Event(socket);
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {my_account_data, my_room_tag, socket} = this.props;

        !this.state.socket && this.Setup_Socket_Event(socket);

        let {participants} = this.state;

        if(!my_room_tag){
            return;
        }

        participants[my_room_tag.id] = {account_data: my_account_data, room_tag: my_room_tag};

        await this.setState({participants, socket, my_room_tag, my_account_data});
    }

    Setup_Socket_Event = (socket)=>{

        if(this.Finished_Setup_Socket === true || !socket){
            return;
        }

        this.Finished_Setup_Socket = true;

        socket?.on('signal_everyone_new_viewer', ({account_data, room_tag})=>{

            let {participants, my_room_tag, my_account_data} = this.state;

            participants[room_tag.id] = {account_data: account_data, room_tag: room_tag};

            this.setState({participants: participants});

            socket.emit('acknowledge_new_viewer', {
                to_room_tag: room_tag, 
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

        socket?.on('pull_request_to_live', async ({from})=>{

            let {participants} = this.state;
            let {id} = from;

            if(participants[id] !== undefined){

                participants[id].request_live = false;

                this.setState({participants});

            }

        });

        socket?.on('leave_chat_room', ({room_tag})=>{

            let {participants} = this.state;

            delete participants[room_tag.id];

            this.setState({participants: participants});

        });

        let {my_account_data: account_data, my_room_tag: room_tag} = this.props;

        socket?.emit('signal_new_viewer_join_chat', {account_data, room_tag});
    }

    Request_To_Go_Live_Answered = (tag) => {

        let { participants } = this.state;
        let { id } = tag;

        if (participants[id] !== undefined) {

            participants[id].request_live = false;

            this.setState({ participants: participants });

        }

    }

    render(){

        let {participants, my_account_data} = this.state;

        return <div id="viewer-display">

            <div id="the-list">

                {Object.keys(participants).map((key, ind)=>{

                    let {account_data, room_tag, request_live} = participants[key];

                    return <div className="participant-entry-wrapper" key={ind} >

                        <Viewer_Entry account_data={account_data}
                            room_tag={room_tag}
                            request_live={request_live}
                            socket={this.state.socket}
                            set_account_view={this.props.set_account_view}
                            request_to_go_live_answered={this.Request_To_Go_Live_Answered}
                            owner_user_account={my_account_data}
                        />

                    </div>;

                })}

            </div>

        </div>;
    }

}

export default Viewer_Display;