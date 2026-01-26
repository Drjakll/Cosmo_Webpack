let Wrapper = function(){

    this.event = ({room_tag, remaining_users}) => {
        
        this.socket.leave(room_tag);
        
        //refresh theirselve's conversation list
        this.socket.emit('refresh_conversation_list', {});

        for(let user of remaining_users){
            this.user_socket[user.id]?.emit('refresh_conversation_list', {});
        }

    };
    
};

export default Wrapper;

