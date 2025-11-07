let Wrapper = function(){

    this.event = ({room_tag, remaining_users}) => {
        
        this.socket.leave(room_tag);
        
        //refresh themself's conversation list
        this.socket.emit('refresh_conversation_list', {});

        for(let user of remaining_users){
            this.email_socket[user.email]?.emit('refresh_conversation_list', {});
        }

    };
    
};

export default Wrapper;

