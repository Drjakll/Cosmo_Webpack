let Wrapper = function(){
    
    this.event = ({room_name}) => {

        this.io.to(room_name).emit('refresh_reactions', {});
        
    };
    
};

export default Wrapper;

