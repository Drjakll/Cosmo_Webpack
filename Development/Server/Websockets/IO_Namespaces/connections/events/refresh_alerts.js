let Wrapper = function(){
    
    this.event = ({user_id}) => {

        this.user_sockets[user_id]?.emit("refresh_alerts", {});

    };
    
};

export default Wrapper;

