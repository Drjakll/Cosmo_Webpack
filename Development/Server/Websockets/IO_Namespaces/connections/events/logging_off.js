let Wrapper = function(){
    
    this.event = ({user_id}) => {
        
        delete this.user_sockets[user_id];

    };
    
};

export default Wrapper;

