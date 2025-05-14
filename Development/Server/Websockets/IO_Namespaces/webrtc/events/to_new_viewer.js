let Wrapper = function(){
    
    this.event = (data) => {
        
        let {to, from} = JSON.parse(data);
        
        this.io.to[to.id].emit('from_current_participant', {from: from});
        
    };
    
};

export default Wrapper;

