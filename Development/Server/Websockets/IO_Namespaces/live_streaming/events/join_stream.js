let Wrapper = function(){
    
    this.event = ({room_tag, account_data}) => {
        
        if(!room_tag){
            return;
        }

        let { stream_id } = room_tag;

        if(Object.keys(this.all_sockets[stream_id]).length >= this.MAX_PERSONS_IN_STREAM){
            this.my_socket.emit('stream_full', {});
            return;
        }

        this.all_sockets[stream_id][room_tag.id] = this.my_socket;

        this.my_socket.tag = room_tag;
        
        this.my_socket.join(stream_id);
        
        this.my_socket.to(stream_id).emit('new_viewer_joined', room_tag);

    };
    
};

export default Wrapper;

