let Wrapper = function(){
    
    this.event = () => {


        this.my_socket?.emit('pong', {});
        
    };
    
};

export default Wrapper;

