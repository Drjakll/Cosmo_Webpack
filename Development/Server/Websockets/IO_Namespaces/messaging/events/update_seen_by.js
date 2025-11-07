let Wrapper = function(){

    this.event = ({room_tag, seen_by}) => {

        //Update everyone in the channel that it has seen by target
        this.io.to(room_tag)?.emit('update_seen_by', {room_tag, seen_by});

    };
    
};

export default Wrapper;

