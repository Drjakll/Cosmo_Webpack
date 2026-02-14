let Wrapper = function(){

    this.event = ({room_tag, to_user_id, from_user_id}) => {
        
        //The reason why massive_send_out is false because it's not sent out to a massive amount of users
        this.user_socket[to_user_id]?.emit('report_private_online', {room_tag, user_id: from_user_id, massive_send_out: true});
    };
    
};

export default Wrapper;

