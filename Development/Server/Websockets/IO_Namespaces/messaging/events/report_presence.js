let Wrapper = function(){

    this.event = ({email}) => {

        if(!email){
            return;
        }
        
        //Assign the socket to the key email for accessing the socket with the given email
        this.email_socket[email] = this.socket;

        this.email_socket[email].last_pinged = Date.now();

    };
    
};

export default Wrapper;

