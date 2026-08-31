let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.socket.leave(room_name);
        
    };
    
};

export default Wrapper;

