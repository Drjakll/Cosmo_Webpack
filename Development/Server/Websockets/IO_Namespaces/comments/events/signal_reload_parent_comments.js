let Wrapper = function(){
    
    this.event = ({parent_room_name}) => {

        console.log(parent_room_name);
        
        this.io.to(parent_room_name).emit('reload_all_comments', {});
        
    };
    
};

export default Wrapper;

