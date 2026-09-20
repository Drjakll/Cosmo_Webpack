let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "auth_conversation_member",
        "get_user_info"
    ]

    this.event = ({room_tag, msg_obj, private_or_public, user_info}) => {

        const {id, first_name, last_name, profile_picture_link} = user_info;

        //Attach the sender information that came from user_auth
        msg_obj.sender_id = id;
        msg_obj.first_name = first_name;
        msg_obj.last_name = last_name;
        msg_obj.profile_picture_link = profile_picture_link;

        this.io.to(room_tag).emit('receive_msg', {room_tag, msg_obj, private_or_public});
        
    };
    
};

export default Wrapper;
