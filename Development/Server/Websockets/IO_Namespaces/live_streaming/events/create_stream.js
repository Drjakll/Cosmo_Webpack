let Wrapper = function(){
    
    this.event = async (tag) => {

        if(!tag){
            return;
        }

        let { stream_id } = tag;

        this.all_sockets[stream_id] = {};

        this.all_sockets[stream_id][tag.id] = this.my_socket;

        tag.key = tag.id;

        this.my_socket.join(stream_id);

        await this.storage.Store(tag);

        this.my_socket.tag = tag;

        this.io.emit('update_stream_list', { streams: this.active_streams });

    };
    
};

export default Wrapper;

