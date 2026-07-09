let Wrapper = function(){

    this.event = ({user_id}) => {

        if(!user_id){
            return;
        }

        this.socket.user_id = user_id;
        
        //Assign the socket to the key email for accessing the socket with the given email
        this.user_socket[user_id] = this.socket;

        this.user_socket[user_id].last_pinged = Date.now();

    };
    
};

export default Wrapper;

