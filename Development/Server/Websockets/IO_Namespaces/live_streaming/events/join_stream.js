let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_user_info"
    ];

    //This is to filter out any forged user_info from the frontend
    let Filter_Frontend_Data = (real_user_info, room_tag)=>{

        for(let key in real_user_info){

            if(room_tag[key] === undefined || key === "id"){
                continue;
            }

            room_tag[key] = real_user_info[key];
        }

    }
    
    this.event = ({room_tag, user_info}) => {
        
        if(!room_tag || room_tag.id !== this.my_socket.id){
            return;
        }

        if(room_tag.is_host){
            room_tag.is_host = false;
        }

        Filter_Frontend_Data(user_info, room_tag);

        room_tag.can_go_live = false;
        room_tag.request_to_go_live = false;

        let { stream_id} = room_tag;

        if(typeof stream_id !== 'string' || !Object.hasOwn(this.all_sockets, stream_id)){

            this.my_socket.emit('stream_not_exist', {});
            
            return;
        }

        if(Object.keys(this.all_sockets[stream_id]).length >= this.MAX_PERSONS_IN_STREAM){

            this.my_socket.emit('stream_full', {});
            return;
        }

        this.all_sockets[stream_id][this.my_socket.id] = this.my_socket;

        this.my_socket.tag = room_tag;

        this.my_socket.user_info = user_info;
        
        this.my_socket.join(stream_id);
        
        this.my_socket.to(stream_id).emit('new_viewer_joined', room_tag);

    };
    
};

export default Wrapper;

