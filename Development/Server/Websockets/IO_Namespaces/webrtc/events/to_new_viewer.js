let Wrapper = function(){
    
    this.event = (data) => {
        
        let {to, from} = JSON.parse(data);
        
        this.all_sockets[to.id].emit('to_new_viewer', JSON.stringify(from));
        
    };
    
};

export default Wrapper;

