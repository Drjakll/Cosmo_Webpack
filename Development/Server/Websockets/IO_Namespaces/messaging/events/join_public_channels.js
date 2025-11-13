let Wrapper = function(){

    this.event = ({public_channels, user_data}) => {
        
        for(let channel_name in public_channels){

            this.socket.join(channel_name);

            //Keep a record of the specific socket to have all the public channels joined
            this.socket.public.rooms_joined[channel_name] = channel_name;

            let channel = public_channels[channel_name];

            //If no channel name is attached to public channel yet
            if(!this.public_channel_list[channel_name]){

                this.public_channel_list[channel_name] = {online_users: {}};

                //If online users is attached to the channel object
                delete channel.online_users;

                this.channel_storage.Store(channel);

            }

            this.public_channel_list[channel_name].online_users[user_data.email] = user_data;

            let {online_users} = this.public_channel_list[channel_name];

            this.io.to(channel_name).emit('update_public_online_users', {online_users, channel_name});

        }

    };
    
};

export default Wrapper;

