let Wrapper = function(){
    
    this.event = ({user_account, followers}) => {

        if(!user_account){
            return;
        }
            
        let {id} = user_account;

        this.online_users[id] = {user_account, socket: this.socket};
        this.online_users_socket[this.socket.id] = {user_account, socket: this.socket, followers};
        
        //Report to the user's followers that the user is online
        for(let i in followers){

            let {id: follower_id} = followers[i];

            let follower_socket = this.online_users[follower_id]?.socket;

            follower_socket?.emit("add_online_user", {online_user: user_account});

        }


    };
    
};

export default Wrapper;
