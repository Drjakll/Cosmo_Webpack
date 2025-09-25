let Wrapper = function(){
    
    this.event = ({email}) => {
        
        delete this.user_email[email];

    };
    
};

export default Wrapper;

