let Wrapper = function(){
    
    //The following_acc user is most likely making the request
    this.event = ({following_acc, follower_acc = null}) => {

        if(following_acc){

            let {id} = following_acc;

            let following_user = this.online_users[id];

            for(let socket_id in following_user){
                let following_socket = following_user[socket_id].socket;


                following_socket?.emit("followers_update", {});

            }
        }

        if(!follower_acc){
            return;
        }
        
        let {id: follower_id} = follower_acc;

        let follower_user = this.online_users[follower_id];

        for(let socket_id in follower_user){
            
            let follower_socket = follower_user[socket_id].socket;

            follower_socket?.emit("force_user_to_check_who_is_online", {});
            follower_socket?.emit("followings_update", {});
        }

    };
    
};

export default Wrapper;
