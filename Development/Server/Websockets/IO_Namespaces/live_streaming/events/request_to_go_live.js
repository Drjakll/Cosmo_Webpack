let Wrapper = function(){
    
    this.event = (data) => {
        
        let {host, from} = data;
        
        this.io.to(host.id).emit('acknowledge_request_to_go_live', {from: from});
        
    };
    
};

export default Wrapper;

