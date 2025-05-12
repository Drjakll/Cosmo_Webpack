let Wrapper = function(){
    
    this.event = (data) => {
        
        let new_viewer_tag = JSON.parse(data);
        
        this.my_socket.join(new_viewer_tag.id);
        
        this.my_socket.all_sockets[this.my_socket.id] = this.my_socket;
        
        this.my_socket.to(new_viewer_tag.id).emit('new_viewer_joined', data);
        
        
    };
    
};

export default Wrapper;

