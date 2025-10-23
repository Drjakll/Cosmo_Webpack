import fs from 'fs';

let Gather_Namespaces = async function(io){
    
    let namespaces = {};
    
    let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/`;
    
    let entries = await fs.readdirSync(path);
    
    for await (let entry of entries){
        
        let sub_path = `${path}${entry}`;
        
        const is_dir = fs.lstatSync(sub_path).isDirectory();
        
        if(is_dir){
            
            let sub_entries = await fs.readdirSync(sub_path);
            
            for await (let sub_entry of sub_entries){
                
                const is_not_dir = !fs.lstatSync(`${sub_path}/${sub_entry}`).isDirectory();
                
                if(is_not_dir && sub_entry.split('.')[1] === 'js'){
                    
                    const key = sub_entry.split('.')[0];
                    
                    namespaces[key] = await import(`./${entry}/${sub_entry}`);
                    
                    namespaces[key] = namespaces[key].default;
                    
                    namespaces[key].prototype.root_io = io;

                    namespaces[key].prototype.storage = Storage;

                    namespaces[key].prototype.request_storage = Request_Storage; 
                    
                    namespaces[key] = new namespaces[key]();
                }
            }
            
        }
    }
    
    return namespaces;
};

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
        storage: {}
    };

    return letter_array;
};

let Storage = function(store_obj){

    this.store_obj = store_obj;

    let Insert_Entry = async (entry, value, dest)=>{

        let vSplit = value.toLowerCase().split("");

        let {key} = entry;

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

            //Toggle between deleting the storage or inserting the storage
            if(ptr.storage[key]){

                delete ptr.storage[key];
                
            } else {

                ptr.storage[key] = entry;
                
            }

            return ptr;
        };

        dest = add(dest);

        await recursion(0, dest);

    };

    let Store_JSON = (entry, src_ptr, dest)=>{

        //Expecting an array of objects
        for(let i in src_ptr){

            let sub_ptr = src_ptr[i];

            //Expecting a json object
            for(let j in sub_ptr){

                if(dest[j] === undefined){
                    continue;
                }

                if(dest[j] === null){
                    dest[j] = create_letter_array();
                }

                Insert_Entry(entry, sub_ptr[j], dest[j]);
            }
            
        }

    };

    this.Store = (store_info)=>{

        for(let key in store_info){

            if(this.store_obj[key] === undefined){
                continue;
            }

            try {

                let json_obj = JSON.parse(store_info[key]);

                Store_JSON(store_info, json_obj, this.store_obj[key]);

            } catch(e){

                switch(typeof store_info[key]){
                    case 'object': 

                        Store_JSON(store_info, store_info[key], this.store_obj[key]);

                        break;

                    default: 

                        if(this.store_obj[key] === null){
                            this.store_obj[key] = create_letter_array();
                        }

                        Insert_Entry(store_info, store_info[key], this.store_obj[key]);

                        break;

                }

            }

        }
    };

};

let Request_Storage = function(store_obj){

    this.store_obj = store_obj;

    this.Search = async (requirements)=>{

        let result = {};

        let Search_Entry = async (value, i_ptr)=>{

            let vSplit = value.toLowerCase().split("");

            let recursion = async (i, ptr) =>{

                if(i > vSplit.length){
                    return true;
                }

                if(!ptr){
                    return false;
                }

                let c = vSplit[i];

                if(!await recursion(i + 1, ptr[c])){
                    return false;
                }

                Add_To_Result(ptr);

                for(let j in ptr){

                    if(j === "storage"){
                        continue;
                    }

                    await recursion(i + 1, ptr[j]);
                        
                }

                return false;
            };

            let Add_To_Result = (ptr)=>{

                let storage = ptr.storage;

                for(let i in storage){
                    result[i] = storage[i];
                }

            }

            if(!i_ptr){
                return;
            }

            let c = vSplit[0];

            if(c === undefined){
                Add_To_Result(i_ptr);
                return;
            }

            if(await recursion(1, i_ptr[c])){
                
                Add_To_Result(i_ptr[c]);

            }
        };

        let Json_Search = async (obj, key)=>{

            for(let i in obj){

                let ptr = this.store_obj[key][i];
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
                    await Search_Entry(req, this.store_obj[i]);
                    break;
            }

        }

        return result;

    }
}

export default Gather_Namespaces;