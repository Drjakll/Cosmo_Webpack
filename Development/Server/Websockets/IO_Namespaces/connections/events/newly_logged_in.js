let Wrapper = function(){
    
    this.event = ({user_id}) => {
        
        this.user_sockets[user_id] = this.socket;

    };
    
};

export default Wrapper;

