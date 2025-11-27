let Wrapper = function(){
    
    this.event = ({photo_id}) => {

        this.socket.join(photo_id);
        
    };
    
};

export default Wrapper;

