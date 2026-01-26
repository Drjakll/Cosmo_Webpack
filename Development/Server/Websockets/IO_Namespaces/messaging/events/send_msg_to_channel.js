let Wrapper = function(){

    this.event = ({room_tag, msg_obj, private_or_public}) => {

        this.io.to(room_tag).emit('receive_msg', {room_tag, msg_obj, private_or_public});
        
    };
    
};

export default Wrapper;
