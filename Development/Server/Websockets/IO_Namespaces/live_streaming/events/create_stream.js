let Wrapper = function(){
    
    this.event = async (tag) => {

        let { stream_id } = tag;

        tag.key = tag.email;

        this.my_socket.join(stream_id);

        await this.storage.Store(tag);

        this.my_socket.tag = tag;

        this.io.emit('update_stream_list', { streams: this.active_streams });

    };
    
};

export default Wrapper;

