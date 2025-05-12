let Wrapper = function(){
    
    this.event = (data) => {
        
        let room_info = JSON.parse(data);
        
        this.my_socket.join(room_info.id);
        
        this.active_streams[room_info.id] = room_info;
        
        this.io.emit('update_stream_list', JSON.stringify(this.active_streams));
    };
    
};

export default Wrapper;

