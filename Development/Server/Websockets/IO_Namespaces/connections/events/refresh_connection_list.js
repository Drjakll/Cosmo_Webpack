let Wrapper = function(){
    
    this.event = ({user_id}) => {

        this.user_sockets[user_id]?.emit("refresh_connection_list", {});

        this.user_sockets[user_id]?.emit("refresh_following_status", {});

    };
    
};

export default Wrapper;

