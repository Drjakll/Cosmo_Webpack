let Wrapper = function(){
    
    this.event = (room_tag) => {

        console.log(room_tag);
        
        let { stream_id, is_host } = room_tag;
        
        if(is_host){
            
            delete this.active_streams[stream_id];
           
            this.io.emit('update_stream_list', {streams: this.active_streams});
            
            this.my_socket.to(stream_id).emit('leave_stream', {msg: "The host has closed the stream"});
        }
        
        this.my_socket.leave(stream_id);
        
    };
    
};

export default Wrapper;

