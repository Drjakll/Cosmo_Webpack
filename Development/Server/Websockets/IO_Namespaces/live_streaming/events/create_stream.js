let Wrapper = function(){

    let create_letter_array = ()=>{

        let letter_array = {
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
            h: null,
            i: null,
            j: null,
            k: null,
            l: null,
            m: null,
            n: null,
            o: null,
            p: null,
            q: null,
            r: null,
            s: null,
            t: null,
            u: null,
            v: null,
            w: null,
            x: null,
            y: null,
            z: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
            0: null,
            ":": null,
            "-": null,
            ".": null,
            "&": null,
            " ": null,
            tags: {}
        };

        return letter_array;
    }

    let Insert_Entry = async (value, ptr, tag)=>{

        let vSplit = value.toLowerCase().split("");

        let {stream_id, thumbnail_link, room_title} = tag;

        let recursion = async (i, sub_ptr)=>{

            let c = vSplit[i];

            if(i >= vSplit.length || c === undefined){
                return;
            }

            sub_ptr[c] = add(sub_ptr[c]);

            await recursion(i+1, sub_ptr[c]);

        };

        let add = (ptr)=>{

            if(ptr === null){
                ptr = create_letter_array();
            }
            //Toggle between deleting the tag or inserting the tag
            if(ptr.tags[tag.stream_id]){
                delete ptr.tags[tag.stream_id];
            } else {
                ptr.tags[tag.stream_id] = {stream_id, thumbnail_link, room_title};
            }

            return ptr;
        };

        ptr = add(ptr);

        await recursion(0, ptr);

    };

    let Store_JSON = async (Obj, key, tag)=>{

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

                if(ptr[j] === null){
                    ptr[j] = create_letter_array();
                }

                Insert_Entry(subObj[j], ptr[j], tag);
            }
        }
    };
    
    let Store_Active_Stream = async (tag)=>{

        for(let i in tag){
            
            if(this.active_streams[i] === undefined){
                continue;
            }

            try {

                let jsonObj = JSON.parse(tag[i]);

                await Store_JSON(jsonObj, i, tag);

            }catch(e){

                if(this.active_streams[i] === null){
                    this.active_streams[i] = create_letter_array();
                }

                await Insert_Entry(tag[i], this.active_streams[i], tag);

            }
        }

    };
    
    this.event = async (tag) => {

        let { stream_id } = tag;

        tag.key = tag.email;

        this.my_socket.join(stream_id);

        console.log(tag);

        //await Store_Active_Stream(tag);

        await this.storage.Store(tag);

        this.my_socket.tag = tag;

        this.io.emit('update_stream_list', { streams: this.active_streams });

    };
    
};

export default Wrapper;

