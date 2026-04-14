let Wrapper = function(){
    
    this.event = (data) => {
        
        let {host, from} = data;
        
        this.io.to(host.id).emit('pull_request_to_live', {from: from});
        
    };
    
};

export default Wrapper;

