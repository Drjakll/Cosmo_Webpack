let Wrapper = function(){
    
    this.event = async (reason) => {

        let { tag } = this.my_socket;

        if (!tag) {
            return;
        }

        let { is_host, stream_id } = tag;

        //If this isn't a host that got disconnected, don't do anything else
        if (!is_host) {

            this.my_socket.to(stream_id).emit('leave_room', { tag: tag });
            
            this.my_socket.to(stream_id).emit('leave_chat_room', {room_tag: tag});

            this.my_socket.leave(stream_id);

            return;
        }

        
        tag.key = tag.email;

        await this.storage.Delete_Entry(tag);
        
        this.io.emit('update_stream_list', {streams: {}});
        
        this.my_socket.to(stream_id).emit('disband_room', {msg: "The host has disconnected from the stream."});

        this.my_socket.leave(stream_id);
    };
    
};

export default Wrapper;

