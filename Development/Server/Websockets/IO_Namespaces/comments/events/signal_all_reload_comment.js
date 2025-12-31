let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.io.to(room_name).emit('reload_comments', {});
        
    };
    
};

export default Wrapper;

