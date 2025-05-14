let Wrapper = function(){
    
    this.event = (reason) => {
                
        //If this isn't a host that got disconnected, don't do anything else
        if(this.active_streams[this.my_socket.id] === undefined){
            return;
        }
        
        this.io.emit('update_stream_list', {streams: this.active_streams});
        
        this.my_socket.to(this.my_socket.id).emit('leave_stream', {msg: "The host has disconnected from the stream."});
        
    };
    
};

export default Wrapper;

