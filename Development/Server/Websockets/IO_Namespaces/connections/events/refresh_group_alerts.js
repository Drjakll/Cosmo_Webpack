let Wrapper = function(){
    
    this.event = ({request_to_users}) => {

        for(let i in request_to_users){

            let id = request_to_users[i].id

            this.user_sockets[id]?.emit("refresh_alerts", {});

        }

    };
    
};

export default Wrapper;

