let Wrapper = function(){

    this.event = ({public_channels}) => {
        
        for(let room_tag in public_channels){

            this.socket.join(room_tag);

        }

    };
    
};

export default Wrapper;

