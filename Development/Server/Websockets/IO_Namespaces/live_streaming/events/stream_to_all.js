let Wrapper = function(){
    
    this.event = async ({ user_room_tag }) => {

        if(!user_room_tag){
            return;
        }

        let {stream_id} = user_room_tag;

        this.my_socket.to(stream_id).emit('video_stream_from_user', { user_room_tag });

    };
    
};

export default Wrapper;