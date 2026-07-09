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
        
        this.my_socket.to(stream_id).emit('signal_everyone_new_viewer', {room_tag, account_data});
    };
    
};

export default Wrapper;
