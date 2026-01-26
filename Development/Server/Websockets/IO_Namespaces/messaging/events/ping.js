let Wrapper = function(){
    
    this.event = ({user_account}) => {

        let {id} = user_account;

        //If it got disconnected, this will be reconnecting...
        if(!this.user_socket[id]){

            this.user_socket[id] = this.socket;

            this.socket.emit('reconnect_all_rooms', {});

        }

        this.socket.last_pinged = Date.now();

        this.socket.emit('pong', {});

    };
    
};

export default Wrapper;

