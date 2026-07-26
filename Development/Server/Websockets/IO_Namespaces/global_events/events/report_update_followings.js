let Wrapper = function(){
    
    //The follower_acc is most likely to be making the request
    this.event = ({follower_acc, following_acc = null}) => {

        if(follower_acc){

            let {id} = follower_acc;

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

        let {id} = following_acc;

        let following_user = this.online_users[id];

        for(let socket_id in following_user){

            let following_socket = following_user[socket_id].socket;

            following_socket?.emit("followers_update", {});
        }

    };
    
};

export default Wrapper;
