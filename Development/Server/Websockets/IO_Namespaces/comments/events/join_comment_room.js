let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.socket.join(room_name);
        
    };
    
};

export default Wrapper;

