let Wrapper = function(){

    this.middleware_names = [
        "user_auth"
    ];
    
    //The user_id is the follower's account's id
    this.event = ({user_id: id, following_acc = null}) => {

        if(id){

            let follower_user = this.online_users[id];

            for(let socket_id in follower_user){

                let follower_socket = follower_user[socket_id].socket;

                follower_socket?.emit("followings_update", {});
                follower_socket?.emit("force_user_to_check_who_is_online", {});
            }
        }

        if(!following_acc){
            return;
        }

        let {id: following_id} = following_acc;

        let following_user = this.online_users[following_id];

        for(let socket_id in following_user){

            let following_socket = following_user[socket_id].socket;

            following_socket?.emit("followers_update", {});
        }

    };
    
};

export default Wrapper;
