let Wrapper = function(){
    
    this.event = (data) => {
        
        let {to, from} = JSON.parse(data);
        
        this.all_sockets[to.id].emit('from_current_participant', JSON.stringify(from));
        
    };
    
};

export default Wrapper;

