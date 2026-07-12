let Wrapper = function(){
    
    this.event = () => {

        let {id: socket_id} = this.socket;

        let user_object = this.online_user_sockets[socket_id];

        if(!user_object){
            return;
        }

        let {user_account, followers} = user_object;

        //Report to other users that this user is offline
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            for(let s_id in follower_sockets){

                let follower_socket = follower_sockets[s_id].socket;

                follower_socket?.emit("remove_offline_user", {offline_user: user_account});
            }

        }

        let {id} = user_account;
      
        this.online_users[id] && (this.online_users[id].hidden = true);
        delete this.online_users[id][socket_id];        
        delete this.online_user_sockets[socket_id];
    };
    
};

export default Wrapper;

