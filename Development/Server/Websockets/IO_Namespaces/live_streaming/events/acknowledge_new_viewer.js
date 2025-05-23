let Wrapper = function(){
    
    this.event = ({to_room_tag, from_account, from_tag}) => {

        let {id} = to_room_tag;
        
        this.io.to(id).emit('received_knowledgement', {from_account: from_account, from_tag: from_tag});
    };
    
};

export default Wrapper;

