let Wrapper = function(){

    this.event = ({room_tag, msg_obj, private_or_public}) => {

        msg_obj.timestamp = Date.now();
        
        this.io.to(room_tag)?.emit('receive_msg', {room_tag, msg_obj, private_or_public});

        //Only save conversation if it's a private one, public conversation will not be saved into database
        if(private_or_public === "private"){

            this.socket.emit('save_conversation', {selected_room_tag: room_tag});

        }
        
    };
    
};

export default Wrapper;

