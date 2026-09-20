let Wrapper = function(){
    
    this.middleware_names = [
        "user_auth"
    ];

    this.event = async ({room_tag, is_hosting, followers, user_id}) => {


        for(let {id} of followers){

            let online_user = this.online_users[id];

            if(online_user === undefined){
                continue;
            }

            for(let socket_id in online_user){

                let {socket} = online_user[socket_id];

                socket?.emit("report_streaming_online_to_following", {room_tag, user_id, is_hosting})
            }

        }

    };
    
};

export default Wrapper;
