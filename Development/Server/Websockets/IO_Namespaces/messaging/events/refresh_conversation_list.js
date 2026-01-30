let Wrapper = function(){

    this.event = ({other_party_ids}) => {
        
        //Refresh self conversation list
        this.socket.emit('refresh_conversation_list', {});

        for(let user of other_party_ids){
            //Refresh other party's conversation list so that they know someone made a new conversation with them
            this.user_socket[user.user_id]?.emit('refresh_conversation_list', {});
        }

    };
    
};

export default Wrapper;

