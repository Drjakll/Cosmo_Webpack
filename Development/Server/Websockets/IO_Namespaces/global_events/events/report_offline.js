let Wrapper = function(){
    
    this.event = ({user_account, followers}) => {

        if(!user_account){
            return;
        }
        
        let {id} = user_account;

        delete this.online_users[id];

        //Report to the user's followers that the user is online
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_socket = this.online_users[follower_id]?.socket;

            if(!follower_socket){
                continue;
            }

            follower_socket?.emit("remove_offline_user", {offline_user: user_account});

        }
    };
    
};

export default Wrapper;
