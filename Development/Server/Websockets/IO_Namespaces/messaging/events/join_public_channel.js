let Wrapper = function(){

    this.event = (channel_info) => {

        let {channel_name} = channel_info;
        
        this.socket.join(channel_name);

        this.channel_storage.store(channel_info);

    };
    
};

export default Wrapper;

