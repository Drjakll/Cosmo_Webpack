let Wrapper = function(){
    
    this.event = async ({ }) => {

        let {tag: user_room_tag} = this.my_socket;

        if(!user_room_tag){
            return;
        }

        let {stream_id, can_go_live} = user_room_tag;

        if(!can_go_live){
            return;
        }

        this.my_socket.to(stream_id).emit('video_stream_from_user', { user_room_tag });

    };
    
};

export default Wrapper;