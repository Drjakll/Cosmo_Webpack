let Wrapper = function(){

    this.event = ({channel_obj, user_id}) => {

        let {channel_name} = channel_obj;
        
        this.socket.leave(channel_name);
        
        delete this.public_channel_list[channel_name]?.online_users?.[user_id];

        let online_users = this.public_channel_list[channel_name]?.online_users || {};

        if(Object.keys(online_users).length === 0){

            channel_obj.key = channel_name;

            this.channel_storage.Delete_Entry(channel_obj);

            delete this.public_channel_list[channel_name];

        } else {

            this.io.to(channel_name).emit('update_public_online_users', {online_users, channel_name});

        }
    };
    
};

export default Wrapper;

