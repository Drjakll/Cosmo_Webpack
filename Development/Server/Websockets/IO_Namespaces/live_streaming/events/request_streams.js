let Wrapper = function(){

    let Search_Stream = async (requirements)=>{

        let result = {};

        let Search_Entry = async (value, i_ptr)=>{

            let vSplit = value.toLowerCase().split("");

            let recursion = async (i, ptr) =>{

                if(i >= vSplit.length){
                    return true;
                }

                if(!ptr){
                    return false;
                }

                let c = vSplit[i];

                if(!await recursion(i + 1, ptr[c])){
                    return false;
                }

                for(let j in ptr){

                    if(j === "tags"){
                        
                        let tag = ptr[j];

                        for(let k in tag){
                            result[k] = tag[k];
                        }

                        continue;
                    }

                    await recursion(i + 1, ptr[j]);
                        
                }

                return false;
            };

            let c = vSplit[0];

            if(!c){
                return;
            }

            if(await recursion(1, i_ptr[c])){

                let tags = i_ptr[c].tags;

                for(let i in tags){
                    result[i] = tags[i];
                }
            }
        };

        let Json_Search = async (obj, key)=>{

            for(let i in obj){

                let ptr = this.active_streams[key][i];
                let value = obj[i];

                await Search_Entry(value, ptr);

            }
        };

        for(let i in requirements){

            let req = requirements[i];

            switch(typeof req){
                case "object":
                    await Json_Search(req, i);
                    break;
                case "string":
                    await Search_Entry(req, this.active_streams[i]);
                    break;
            }

        }

        return result;

    }
    
    this.event = async (search) => {
        
        let result = await Search_Stream(search);
        
        this.my_socket.emit('catch_streams', {streams: result});
        
    };
    
};

export default Wrapper;

