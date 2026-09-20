let Wrapper = function({session_sockets}){
    
    this.middleware_names = [
        "user_auth",
        "get_follower_ids"
    ];

    this.event = async ({followers, user_id: id}) => {

        if(!id){
            return;
        }

        if(this.online_users[id]){

            this.online_users[id].hidden = true;
            
        }

        //Report to the user's followers that the user is offline
        for(let i in followers){

            let {follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            for(let s_id in follower_sockets){

                let follower_socket = follower_sockets[s_id].socket;

                follower_socket?.emit("remove_offline_user", {offline_user_id: id});
            }

        }

    };
    
};

export default Wrapper;
