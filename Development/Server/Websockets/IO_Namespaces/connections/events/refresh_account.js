let Wrapper = function(){
    
    this.event = ({request_to_email}) => {

        this.user_email[request_to_email]?.emit("refresh_account", {});

    };
    
};

export default Wrapper;

