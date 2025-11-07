let Wrapper = function(){

    this.event = ({room_tag, to_email, from_email}) => {
        
        //The reason why massive_send_out is false because it's not sent out to a massive amount of users
        this.email_socket[to_email].emit('report_online', {room_tag, email: from_email, massive_send_out: false});
    };
    
};

export default Wrapper;

