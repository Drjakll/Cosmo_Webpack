let Wrapper = function(){
    
    this.event = ({user_account, followings}) => {

        for(let following of followings){

            let {id} = following;

            if(!this.online_users[id] || this.online_users[id].hidden){
                continue;
            }

            this.socket.emit("add_online_user", {online_user: following});

        }

    };
    
};

export default Wrapper;
