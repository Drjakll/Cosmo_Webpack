let Wrapper = function(){
    
    this.event = (data) => {
        
        let {id, is_host} = JSON.parse(data);
        
        if(is_host){
            
            delete this.active_streams[id];
           
            this.io.emit('update_stream_list', JSON.stringify(this.active_streams));
            
            this.my_socket.to(id).emit('leave_stream', "The host has closed the stream");
        }
        
        this.my_socket.leave(id);
        
        delete this.all_sockets[this.my_socket.id];
        
    };
    
};

export default Wrapper;

