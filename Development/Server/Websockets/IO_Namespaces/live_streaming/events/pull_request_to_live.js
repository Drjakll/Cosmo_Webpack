let Wrapper = function(){
    
    this.event = ({host}) => {

        let {tag: from} = this.my_socket;

        if(!host || !from){
            return;
        }

        from.request_to_go_live = false;
        
        this.io.to(host.id).emit('pull_request_to_live', {from: from});
        
    };
    
};

export default Wrapper;

