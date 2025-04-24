let Wrapper = function(){
    
    this.event = (photo_id) => {
        
        this.socket.to(photo_id).emit('reload_comments', '');
        
    };
    
};

export default Wrapper;

