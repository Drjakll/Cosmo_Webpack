let Wrapper = function(){
    
    this.event = (data) => {
        
        let room_info = JSON.parse(data);
        
        this.socket.join(room_info.id);
        
    };
    
};

export default Wrapper;

