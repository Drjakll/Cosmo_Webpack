let Wrapper = function(){
    
    this.event = ({host}) => {

        let {tag: from} = this.my_socket;

        if(!host || !from){
            return;
        }

        from.request_to_go_live = true;
        
        this.io.to(host.id).emit('acknowledge_request_to_go_live', {from});
        
    };
    
};

export default Wrapper;

