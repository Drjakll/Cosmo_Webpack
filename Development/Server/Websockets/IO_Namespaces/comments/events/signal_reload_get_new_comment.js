let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.io.to(room_name).emit('reload_a_new_comment', {});
        
    };
    
};

export default Wrapper;

