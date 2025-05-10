let Wrapper = function(){
    
    this.event = (reason) => {
        
        delete this.active_streams[this.socket.id];
        
        this.io.emit('update_stream_list', JSON.stringify(this.active_streams));
    };
    
};

export default Wrapper;

