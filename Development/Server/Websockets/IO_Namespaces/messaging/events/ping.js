let Wrapper = function(){
    
    this.event = ({user_account, room_tags}) => {

        let {email} = user_account;

        //If it got disconnected, this will be reconnecting...
        if(!this.email_socket[email]){

            this.email_socket[email] = this.socket;

            this.socket.emit('reconnect_all_rooms', {});

        }

        this.socket.last_pinged = Date.now();

        this.socket.emit('pong', {});

    };
    
};

export default Wrapper;

