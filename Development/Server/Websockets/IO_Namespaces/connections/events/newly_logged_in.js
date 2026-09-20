let Wrapper = function(){

    this.middleware_names = [
        "user_auth"
    ]
    
    this.event = ({user_id}) => {
        
        this.user_sockets[user_id] = this.socket;

    };
    
};

export default Wrapper;

