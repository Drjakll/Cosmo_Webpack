let Wrapper = function(){
    
    this.event = (data) => {
        
        let room_info = JSON.parse(data);
        
        this.socket.to(room_info.id).emit('to_new_viewer', data);
        
    };
    
};

export default Wrapper;

