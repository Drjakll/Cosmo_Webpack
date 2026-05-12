let Wrapper = function(){
    
    this.event = ({user_account, followings}) => {

        let {id: self_id} = user_account;

        let self_socket = this.online_users[self_id]?.socket;

        for(let following of followings){

            let {id} = following;

            if(!this.online_users[id]){
                continue;
            }

            self_socket.emit("add_online_user", {online_user: following});

        }

    };
    
};

export default Wrapper;
