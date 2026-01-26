let Wrapper = function(){

    this.event = ({room_tag, to_user_id, from_user_id}) => {
        
        //The reason why massive_send_out is false because it's not sent out to a massive amount of users
        this.email_socket[to_user_id]?.emit('report_private_online', {room_tag, user_id: from_user_id, massive_send_out: false});
    };
    
};

export default Wrapper;

