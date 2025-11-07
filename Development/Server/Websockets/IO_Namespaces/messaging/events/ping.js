let Wrapper = function(){
    
    this.event = ({email, room_tags}) => {

        //If it got disconnected, this will be reconnecting...
        if(!this.email_socket[email]){

            this.email_socket[email] = this.socket;

            for(let i in room_tags){

                this.socket.join(room_tags[i]);

                //The reason why massive_send_out is true is because this report is sent out to the mass amount of users
                this.socket.to(room_tags[i]).emit('report_online', {email, room_tag: room_tags[i], massive_send_out: true});
            }

        }

        this.email_socket[email].last_pinged = Date.now();

    };
    
};

export default Wrapper;

