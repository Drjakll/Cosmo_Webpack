let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_user_info"
    ]
    
    this.event = ({user_info: account_data}) => {

        let {tag: room_tag} = this.my_socket;
        
        if(!room_tag){
            return;
        }

        let { stream_id } = room_tag;

        const socket_ids = this.all_sockets[stream_id];

        if(!socket_ids || socket_ids[this.my_socket.id] !== this.my_socket){
            return;
        }
        
        this.my_socket.to(stream_id).emit('signal_everyone_new_viewer', {room_tag, account_data});
    };
    
};

export default Wrapper;
