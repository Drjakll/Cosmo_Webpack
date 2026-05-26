let Wrapper = function(){
    
    this.event = ({follower_acc, following_acc = null}) => {

        let {id} = follower_acc;

        let follower_socket = this.online_users[id]?.socket;

        follower_socket?.emit("followings_update", {removed_following: following_acc});

    };
    
};

export default Wrapper;
