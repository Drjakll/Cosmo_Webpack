let Wrapper = function(){

    this.event = ({public_channels, user_data}) => {
        
        for(let i in public_channels){

            let {channel_name} = public_channels[i];
            
            this.socket.join(channel_name);

            //Keep a record of the specific socket to have all the public channels joined
            this.socket.public.rooms_joined[channel_name] = channel_name;


            //If no channel name is attached to public channel yet
            if(!this.public_channel_list[channel_name]){

                this.public_channel_list[channel_name] = {online_users: {}};

                //Must have a "key" field for storage purposes
                public_channels[i].key = channel_name;

                this.channel_storage.Store(public_channels[i]);

            }

            this.public_channel_list[channel_name].online_users[user_data.id] = user_data;

            let {online_users} = this.public_channel_list[channel_name];

            this.io.to(channel_name).emit('update_public_online_users', {online_users, channel_name});

        }

    };
    
};

export default Wrapper;

