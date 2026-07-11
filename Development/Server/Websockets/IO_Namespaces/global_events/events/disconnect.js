let Wrapper = function(){
    
    this.event = () => {

        let {id: socket_id} = this.socket;

        let user_object = this.online_users_socket[socket_id];

        if(!user_object){
            return;
        }

        let {user_account, followers} = user_object;

        //Report to other users that this user is offline
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            //The followers may have multiple sessions open
            for(let s_id in follower_sockets){

                follower_sockets[s_id].socket?.emit("remove_offline_user", {offline_user: user_account});
            }

        }

        let {id, session_id} = user_account;
      
        delete this.online_users[id][session_id];        
        delete this.online_users_socket[socket_id];
    };
    
};

export default Wrapper;

