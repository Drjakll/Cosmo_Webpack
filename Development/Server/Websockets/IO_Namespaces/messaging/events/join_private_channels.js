let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_private_conv_ids"
    ];

    this.event = ({private_conversations, user_id}) => {
        
        //Using the conversation_id as a conversation_id
        for(let i in private_conversations){

            let {conversation_id} = private_conversations[i];

            this.socket.join(conversation_id);

            this.socket.private.rooms_joined[conversation_id] = conversation_id;
            
            //The reason why massive_send_out is true is because this report is sent out to the mass amount of users
            this.io.to(conversation_id).emit('report_private_online', {user_id, room_tag: conversation_id, massive_send_out: true});
        }

    };
    
};

export default Wrapper;

