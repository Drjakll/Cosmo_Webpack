let Wrapper = function(){

    //To log off other sessions of the same account except for the current session
    let log_off_self = (online_users, this_session_id)=>{

        for(let s_id in online_users){

            if(s_id === this_session_id){
                continue;
            }

            const other_socket = online_users[s_id].socket;

            other_socket?.emit('log_self_off', {});

            delete this.online_users_socket[other_socket?.id]

        }

    };
    
    this.event = ({user_account, followers}) => {

        if(!user_account){
            return;
        }
            
        let {id, session_id} = user_account;


        //Log off self account from other sessions
        if(id && this.online_users[id]){

            log_off_self(this.online_users[id], session_id);
        }

        //I setup the this.online_users["user_id"]["session_id"] = {"user_account": some_user_account, socket: this.socket}
        //Because they maybe using the same account with different session, so log off the one that isn't the current session
        if(!this.online_users[id]){
            this.online_users[id] = {};
        }
            
        this.online_users[id].hidden = false; //Hidden is different from completely offline. Socket is still active
        this.online_users[id][session_id] = {user_account, socket: this.socket};
        

        //I made this so that it's easier to access user_account when disconnect event triggers
        this.online_users_socket[this.socket.id] = {user_account, socket: this.socket, followers};
        
        //Report to the user's followers that the user is online
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            //The followers may have multiple sessions open
            for(let s_id in follower_sockets){

                follower_sockets[s_id].socket?.emit("add_online_user", {online_user: user_account});
            }

        }

    };
    
};

export default Wrapper;
