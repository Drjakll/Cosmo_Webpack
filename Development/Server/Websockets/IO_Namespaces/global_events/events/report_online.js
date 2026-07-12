let Wrapper = function(){

    //To log off other sessions of the same account except for the current session
    let log_off_self = (all_self_acc)=>{

        for(let s_id in all_self_acc){

            if(s_id === String(this.socket.id)){
                continue;
            }

            const other_socket = all_self_acc[s_id].socket;

            other_socket?.emit('log_self_off', {});

            delete all_self_acc[s_id];

            delete this.online_user_sockets[other_socket?.id];
            
        }
    };
    
    this.event = ({user_account, followers}) => {

        if(!user_account){
            return;
        }
            
        let {id} = user_account;


        //Log off self account from other sessions
        if(id && this.online_users[id]){

            log_off_self(this.online_users[id]);

        }

        if(!this.online_users[id]){
            this.online_users[id] = {};
        }

        //Hidden is different from completely offline. Socket is still active
        this.online_users[id][this.socket.id] = {user_account, socket: this.socket, hidden: false};
        

        //I made this so that it's easier to access user_account when disconnect event triggers
        this.online_user_sockets[this.socket.id] = {user_account, socket: this.socket, followers};

        this.socket.emit('log_self_back_in', {});
        
        //Report to the user's followers that the user is online
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_sockets = this.online_users[follower_id];

            for(let s_id in follower_sockets){

                let follower_socket = follower_sockets[s_id].socket;

                follower_socket?.emit("add_online_user", {online_user: user_account});
            }

        }

    };
    
};

export default Wrapper;
