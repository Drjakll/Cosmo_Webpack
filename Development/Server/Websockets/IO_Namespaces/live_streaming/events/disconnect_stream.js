let Wrapper = function(){

    let Search_Entry = async (value, ptr, tag)=>{

        let vSplit = value.toLowerCase().split("");

        let {stream_id} = tag;

        let recursion = async (i, sub_ptr)=>{

            if(i >= vSplit.length){
                return;
            }

            let c = vSplit[i];

            if(sub_ptr[c] === null){
                return;
            }

            delete sub_ptr.tags[tag.stream_id];

            await recursion(i+1, sub_ptr[c]);

        };

        await recursion(0, ptr);

    };

    let Search_JSON = async (Obj, key, tag)=>{

        //Create a pointer for the active_streams
        let ptr = this.active_streams[key];

        //Expecting the object to be an array instead of a pure Json object
        for(let i in Obj){
            
            //Picking an entry out from the array
            let subObj = Obj[i];

            //Each entry should be a pure Json object, example: {name1: "abc", name2: "def"}
            for(let j in subObj){

                if(ptr[j] === undefined){
                    continue;
                }

                Search_Entry(subObj[j], ptr[j], tag);
            }
        }        

    };

    let Delete_Active_Stream = async (tag)=>{

        for(let i in tag){
            
            if(this.active_streams[i] === undefined){
                continue;
            }

            try {

                let jsonObj = JSON.parse(tag[i]);

                await Search_JSON(jsonObj, i, tag);

            }catch(e){

                await Search_Entry(tag[i], this.active_streams[i], tag);

            }
        }

    };
    
    this.event = async (reason) => {

        let { tag } = this.my_socket;

        if (!tag) {
            return;
        }

        let { is_host, stream_id } = tag;

        //If this isn't a host that got disconnected, don't do anything else
        if (!is_host) {

            this.my_socket.to(stream_id).emit('leave_room', { tag: tag });
            
            this.my_socket.to(stream_id).emit('leave_chat_room', {room_tag: tag});

            this.my_socket.leave(stream_id);

            return;
        }

        await Delete_Active_Stream(tag);
        
        this.io.emit('update_stream_list', {streams: {}});
        
        this.my_socket.to(stream_id).emit('disband_room', {msg: "The host has disconnected from the stream."});

        this.my_socket.leave(stream_id);
    };
    
};

export default Wrapper;

