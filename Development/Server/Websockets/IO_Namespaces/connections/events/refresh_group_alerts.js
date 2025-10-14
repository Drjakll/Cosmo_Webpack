let Wrapper = function(){
    
    this.event = ({request_to_emails}) => {

        for(let i in request_to_emails){

            let email = request_to_emails[i].email

            this.user_email[email]?.emit("refresh_alerts", {});

        }

    };
    
};

export default Wrapper;

