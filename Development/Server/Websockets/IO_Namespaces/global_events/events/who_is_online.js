let Wrapper = function(){
    
    this.event = ({user_account, followings}) => {

        let online_users = [];

        for(let following of followings){

            let {id} = following;

            if(!this.online_users[id] || this.online_users[id].hidden){
                continue;
            }

            online_users.push(following);

        }

        this.socket.emit("who_is_online", {online_users});

    };
    
};

export default Wrapper;
