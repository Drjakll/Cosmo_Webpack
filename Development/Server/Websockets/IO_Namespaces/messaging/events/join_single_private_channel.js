let Wrapper = function(){

    this.event = (private_conversation) => {
        
        this.socket.join(private_conversation.room_tag);

    };
    
};

export default Wrapper;

