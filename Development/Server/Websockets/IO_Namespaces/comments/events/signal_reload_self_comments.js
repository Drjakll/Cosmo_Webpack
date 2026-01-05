let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.io.to(room_name).emit('reload_all_comments_from_child', {});
        
    };
    
};

export default Wrapper;

