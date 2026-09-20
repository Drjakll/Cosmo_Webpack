let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_following_data"
    ];
    
    this.event = ({user_account, followings}) => {

        let online_users = [];

        for(let following of followings){

            let {id} = following;

            if(!this.online_users[id] || this.online_users[id].hidden){
                continue;
            }

            //Attach room tag so recent logged in user would know if this user is streaming or not
            let {room_tag} = this.online_users[id];

            following.room_tag = room_tag;

            online_users.push(following);

        }

        this.socket.emit("who_is_online", {online_users});

    };
    
};

export default Wrapper;
