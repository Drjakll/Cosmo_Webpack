let Wrapper = function(){
    
    this.event = async (room_tag) => {
        
        if(!room_tag){
            return;
        }

        let { is_host, stream_id } = room_tag;

        //If this isn't a host that got disconnected, don't do anything else
        if (!is_host) {

            delete this.my_socket.tag;

            this.my_socket.to(stream_id).emit('leave_room', { tag: room_tag });

            this.my_socket.to(stream_id).emit('leave_chat_room', {room_tag: room_tag});

            this.my_socket.leave(stream_id);

            if(this.all_sockets[stream_id]){

                delete this.all_sockets[stream_id][room_tag?.id];
                
            }
            return;
        }

        //await this.Delete_Active_Stream(room_tag);

        room_tag.key = room_tag.id;

        await this.storage.Delete_Entry(room_tag);
        
        this.io.emit('update_stream_list', {streams: {}});

        delete this.my_socket.tag;
        
        this.my_socket.to(stream_id).emit('disband_room', {msg: "The host has disconnected from the stream."});

        this.my_socket.leave(stream_id);

        delete this.all_sockets[stream_id];
    };
    
};

export default Wrapper;

