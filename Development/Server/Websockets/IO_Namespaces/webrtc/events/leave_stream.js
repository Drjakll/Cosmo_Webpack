let Wrapper = function(){
    
    this.event = (room_tag) => {
        
        if(!room_tag){
            return;
        }
        
        let { stream_id, is_host } = room_tag;
        
        if (is_host) {

            delete this.active_streams[stream_id];

            this.io.emit('update_stream_list', { streams: this.active_streams });

            this.my_socket.to(stream_id).emit('disband_room', { msg: "The host has closed the stream" });

        } else {

            this.my_socket.to(stream_id).emit('leave_room', { tag: room_tag });

        }
        
        this.my_socket.leave(stream_id);
        
    };
    
};

export default Wrapper;

