let Wrapper = function(){
    
    this.event = ({room_tag, account_data}) => {
        
        let { stream_id } = room_tag;

        this.my_socket.tag = room_tag;
        
        this.my_socket.join(stream_id);
        
        this.my_socket.to(stream_id).emit('new_viewer_joined', room_tag);
        
        this.my_socket.to(stream_id).emit('new_viewer_enter_chat', {room_tag: room_tag, account_data});
    };
    
};

export default Wrapper;

