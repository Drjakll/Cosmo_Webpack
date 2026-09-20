let Wrapper = function(){

    this.middleware_names = [
        "user_auth"
    ];
    
    this.event = ({user_id}) => {
        
        delete this.user_sockets[user_id];

    };
    
};

export default Wrapper;

