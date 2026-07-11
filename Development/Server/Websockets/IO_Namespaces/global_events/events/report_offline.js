let Wrapper = function(){
    
    this.event = ({user_account, followers}) => {

        if(!user_account){
            return;
        }

        let {id} = user_account;

        if(this.online_users[id]){
            this.online_users[id].hidden = true;
        }

        //Report to the user's followers that the user is offline
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            for(let s_id in follower_sockets){

                follower_sockets[s_id].socket?.emit("remove_offline_user", {offline_user: user_account});
            }

        }
    };
    
};

export default Wrapper;
