let Wrapper = function(){
    
    this.event = () => {

        let {id: socket_id} = this.socket;

        let user_object = this.online_users_socket[socket_id];

        if(!user_object){
            return;
        }

        let {user_account, followers} = user_object;

        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_socket = this.online_users[follower_id]?.socket;

            if(!follower_socket){
                continue;
            }

            follower_socket?.emit("remove_offline_user", {offline_user: user_account});
            
        }
      
        delete this.online_users[user_account.id];        
        delete this.online_users_socket[socket_id];

    };
    
};

export default Wrapper;

