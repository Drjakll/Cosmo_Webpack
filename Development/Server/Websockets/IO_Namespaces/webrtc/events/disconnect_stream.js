let Wrapper = function(){
    
    this.event = (reason) => {

        let { tag } = this.my_socket;

        if (!tag) {
            return;
        }

        let { is_host, stream_id } = tag;

        //If this isn't a host that got disconnected, don't do anything else
        if (!is_host) {

            this.my_socket.to(stream_id).emit('leave_room', { tag: tag });

            this.my_socket.leave(stream_id);

            return;
        }

        delete this.active_streams[stream_id];
        
        this.io.emit('update_stream_list', {streams: this.active_streams});
        
        this.my_socket.to(stream_id).emit('disband_room', {msg: "The host has disconnected from the stream."});

        this.my_socket.leave(stream_id);
    };
    
};

export default Wrapper;

