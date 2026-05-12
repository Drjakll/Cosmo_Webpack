let Wrapper = function(){
    
    this.event = ({following_acc, follower_acc = null}) => {

        let {id} = following_acc;

        let following_socket = this.online_users[id].socket;

        following_socket?.emit("followers_update", {});

        if(!follower_acc){
            return;
        }
        
        let {id: follower_id} = follower_acc;

        let follower_socket = this.online_users[follower_id].socket;

        follower_socket?.emit("remove_offline_user", {offline_user: {id}});

    };
    
};

export default Wrapper;
