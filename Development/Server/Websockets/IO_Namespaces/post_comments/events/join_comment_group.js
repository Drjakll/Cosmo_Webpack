let Wrapper = function(){
    
    this.event = (post_id) => {
        
        this.socket.join(post_id);
        
    };
    
};

export default Wrapper;

