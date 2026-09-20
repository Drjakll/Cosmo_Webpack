let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_user_info"
    ];
    
    this.event = ({to_room_tag: to, user_info: from_account}) => {

        let {tag: from_tag} = this.my_socket;

        if(!to || !from_account || !from_tag) {
            return;
        }

        if(from_tag.stream_id !== to.stream_id){
            return;
        }

        let sockets = this.all_sockets[to.stream_id];

        if(!Object.hasOwn(sockets, to.id)){
            return;
        }

        let {id} = to;
        
        this.io.to(id).emit('received_knowledgement', {from_account, from_tag});
    };
    
};

export default Wrapper;

