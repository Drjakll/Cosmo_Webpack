let Wrapper = function(){
    
    this.event = (data) => {
        
        this.socket.emit('catch_streams', JSON.stringify(this.active_streams));
        
    };
    
};

export default Wrapper;

