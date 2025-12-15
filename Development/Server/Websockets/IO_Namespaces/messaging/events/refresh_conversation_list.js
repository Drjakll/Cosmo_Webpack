let Wrapper = function(){

    this.event = ({other_party_emails}) => {
        
        //Refresh self conversation list
        this.socket.emit('refresh_conversation_list', {});

        for(let user of other_party_emails){
            //Refresh other party's conversation list so that they know someone made a new conversation with them
            this.email_socket[user.user_email]?.emit('refresh_conversation_list', {});
        }

    };
    
};

export default Wrapper;

