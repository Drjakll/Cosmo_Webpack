let Wrapper = function(){
    
    this.event = (tag) => {

        let { stream_id } = tag;

        this.my_socket.join(stream_id);

        this.active_streams[stream_id] = tag;

        this.io.emit('update_stream_list', { streams: this.active_streams });

        this.my_socket.to(stream_id).emit('new_viewer_joined', tag);
    };
    
};

export default Wrapper;

