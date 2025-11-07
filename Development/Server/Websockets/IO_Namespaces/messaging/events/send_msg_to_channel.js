let Wrapper = function(){

    this.event = ({room_tag, msg_obj}) => {

        msg_obj.timestamp = Date.now();
        
        this.io.to(room_tag)?.emit('receive_msg', {room_tag, msg_obj});

        this.socket.emit('save_conversation', {selected_room_tag: room_tag});
        
    };
    
};

export default Wrapper;

