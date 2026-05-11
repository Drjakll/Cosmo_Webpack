let Wrapper = function(){
    
    this.event = (data) => {

        if(!data){
            return;
        }
        
        let {to, from} = data;
        
        this.io.to[to.id].emit('from_current_participant', {from: from});
        
    };
    
};

export default Wrapper;

