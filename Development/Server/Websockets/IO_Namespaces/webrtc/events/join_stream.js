let Wrapper = function(){
    
    this.event = (new_peer) => {
        
        let {stream_id} = new_peer;
        
        this.my_socket.join(stream_id);
        
        this.my_socket.to(stream_id).emit('new_viewer_joined', new_peer);
        
    };
    
};

export default Wrapper;

