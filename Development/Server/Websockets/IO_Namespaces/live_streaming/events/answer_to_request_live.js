let Wrapper = function(){
    
    this.event = ({to, answer}) => {

        let {tag} = this.my_socket;

        let target_requested = this.all_sockets[to.stream_id][to.id].tag.request_to_go_live;

        if(!to || 
            typeof answer !== 'boolean' || 
            !tag.is_host || 
            tag.stream_id !== to.stream_id ||
            !target_requested
        ){
            return;
        }
        
        let {id, stream_id} = to;

        this.all_sockets[stream_id][id].tag.can_go_live = answer;
        this.all_sockets[stream_id][id].tag.request_to_go_live = false;
        
        this.io.to(id).emit('receive_answer_to_go_live', {answer});
        
    };
    
};

export default Wrapper;

