let Wrapper = function(){
    
    this.event = ({room_name}) => {
        
        this.socket.join(room_name);
        
        this.socket.emit('confirm_joined_room', {});
    };
    
};

export default Wrapper;

