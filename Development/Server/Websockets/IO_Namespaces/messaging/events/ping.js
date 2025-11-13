let Wrapper = function(){
    
    this.event = ({user_account, room_tags}) => {

        let {email} = user_account;

        //If it got disconnected, this will be reconnecting...
        if(!this.email_socket[email]){

            this.email_socket[email] = this.socket;

            for(let i in room_tags.private){

                let room_name = room_tags.private[i];

                this.socket.join(room_name);

                //The reason why massive_send_out is true is because this report is sent out to the mass amount of users
                this.socket.to(room_name).emit('report_private_online', {email, room_tag: room_name, massive_send_out: true});
            }

            for(let i in room_tags.public){

                let public_room_name = room_tags.public[i];

                this.socket.join(public_room_name);

                this.public_channel_list[public_room_name].online_users[email] = user_account;

                let online_users = this.public_channel_list[public_room_name].online_users;

                this.socket.to(public_room_name).emit('update_public_online_users', {channel_name: public_room_name, online_users: online_users || {}});
            }

        }

        this.email_socket[email].last_pinged = Date.now();

    };
    
};

export default Wrapper;

