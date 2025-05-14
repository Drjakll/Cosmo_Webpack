let Wrapper = function(){
    
    this.event = (room_info) => {

        let { stream_id } = room_info;

        this.my_socket.join(stream_id);

        this.active_streams[stream_id] = room_info;

        this.io.emit('update_stream_list', { streams: this.active_streams });
    };
    
};

export default Wrapper;

