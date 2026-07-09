let Wrapper = function(){
    
    this.event = () => {

        this.socket?.emit('pong', {});
        
    };
    
};

export default Wrapper;

