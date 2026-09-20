let Wrapper = function(){

    this.middleware_names = [
        "user_auth",
        "get_user_info_with_tables"
    ];

    const stream_id_prefix = "stream:";
    
    this.event = async ({my_room_tag: tag, user_info}) => {

        if(!tag){
            return;
        }

        //Adding any additional information needed. Mainly for the User_Hobbies, User_Professions, 
        //User_Locations and User_Schools, as well as filtering any injected information
        //from frontend
        if(user_info){

            for(let key in user_info){
                
                if(tag[key] === undefined || key === "id"){
                    continue;
                }

                tag[key] = user_info[key];
            }

        }

        if(!tag || tag.id !== this.my_socket.id){
            return;
        }

        tag.can_go_live = true;
        tag.request_to_go_live = false;

        let { stream_id } = tag;

        if(typeof stream_id !== "string" ||
            !stream_id.startsWith(stream_id_prefix) ||
            stream_id.length <= stream_id_prefix.length
        ){
            return;
        }

        if(this.all_sockets[stream_id] !== undefined){
            return;
        }

        tag.is_host = true;

        this.all_sockets[stream_id] = {};

        this.all_sockets[stream_id][tag.id] = this.my_socket;

        tag.key = tag.id;

        this.my_socket.join(stream_id);

        await this.storage.Store(tag);

        this.my_socket.tag = tag;

        this.my_socket.user_info = user_info;

        this.io.emit('update_stream_list', { streams: this.active_streams });

    };
    
};

export default Wrapper;

