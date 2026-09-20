let Wrapper = function(){
    
    this.event = ({to}) => {

        let {tag: from} = this.my_socket;

        if(!to || 
            to.stream_id !== from.stream_id ||
            !Object.hasOwn(this.all_sockets[to.stream_id], to.id)
        ){
            return;
        }
        
        this.io.to(to.id).emit('from_current_participant', {from});
        
    };
    
};

export default Wrapper;

