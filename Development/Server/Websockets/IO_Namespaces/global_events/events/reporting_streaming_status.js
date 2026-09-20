let Wrapper = function(){
    
    this.middleware_names = [
        "user_auth"
    ];

    //This request sends the streaming status of a user to all of their followers.
    //But first send a response to the upper bar to report the streaming status because the upper bar
    //will have the followers information.
    //status : true = streaming, false = not streaming
    this.event = async ({ room_tag, is_hosting, is_streaming, user_id: id}) => {

        let online_user = this.online_users[id];

        if(!online_user){
            return;
        }

        //Give itself a room_tag object so that future followers who logged in would be able to 
        //tell that this user is streaming or in a stream
        if(is_streaming){

            online_user.room_tag = room_tag;

        } else {

            delete online_user.room_tag;

        }

        for(let socket_id in online_user){

            let socket = online_user[socket_id].socket;

            socket?.emit("report_streaming_status", {room_tag, is_hosting, is_streaming});
        }

    };
    
};

export default Wrapper;
