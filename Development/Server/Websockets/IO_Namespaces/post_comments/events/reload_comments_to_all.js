let Wrapper = function(){
    
    this.event = (post_id) => {
        
        this.socket.to(post_id).emit('reload_comments', '');
        
    };
    
};

export default Wrapper;

