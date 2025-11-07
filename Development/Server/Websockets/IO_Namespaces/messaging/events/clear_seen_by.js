let Wrapper = function(){

    this.event = ({room_tag, signal_sent_by}) => {
        
        this.io.to(room_tag)?.emit('clear_seen_by', {room_tag, signal_sent_by});

    };
    
};

export default Wrapper;

