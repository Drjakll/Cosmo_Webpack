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
        "!": null,
        "?": null,
        "@": null,
        "*": null,
        "%": null,
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

        for(let i = 0; i < vSplit.length; i++){

            await recursion(i, dest);

        }

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

    //----- The function below is for searching an entry -----

    this.Search = async (requirements)=>{

        let result = {};

        let Search_Entry = async (value, i_ptr, result_ptr)=>{

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
                    result_ptr[i] = storage[i];
                }

            };

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

        let Json_Search = async (req_obj, store_obj, result_ptr)=>{

            for(let i in req_obj){

                let ptr = store_obj[i];
                let value = req_obj[i];

                if(result_ptr[i] === undefined){
                    result_ptr[i] = {};
                }

                await Search_Entry(value, ptr, result_ptr[i]);

            }
        };

        //Collect all the results with the "or" conjunction
        for(let i in requirements){

            let req = requirements[i];
            
            if(result[i] === undefined){
                result[i] = {};
            }

            switch(typeof req){
                case "object":
                    await Json_Search(req, this.store_obj[i], result[i]);
                    break;
                case "string":
                    await Search_Entry(req, this.store_obj[i], result[i]);
                    break;
            }

        }

        /*
            Example json_obj: 

            {
                first_name: {"dr_kimsora@yahoo.com": Obj, "justinzhucs@gmail.com": Obj},
                hobbies: {
                    hobby: {"dr_kimsora@yahoo.com": Obj},
                    proficiency: {"dr_kimsora@yahoo.com": Obj, "justinzhucs@gmail.com": Obj},
                    date_started: {"dr_kimsora@yahoo.com": Obj}
                }
            }

            Example req_obj 

            {
                first_name: "j",
                hobbies {
                    hobby: "build",
                    proficiency: "good",
                    date_started: "1998-1-1"
                }
            }
        */

        //This is pick out the "and" conjunction

        let Intersection = (obj1, obj2)=>{

            let result = {};
            
            for(let i in obj1){

                if(i in obj2){
                    result[i] = obj2[i];
                }
            }

            return result;
        };

        let Test = (req_obj, result_obj)=>{

            let prevSet = null;
            
            for(let i in req_obj){

                let sub_obj = req_obj[i];

                switch(typeof sub_obj){

                    case "string":
                        if(prevSet === null){
                            prevSet = result_obj[i];
                        } else {
                            prevSet = Intersection(prevSet, result_obj[i]);
                        }

                        break;
                    case "object":
                        let temp = Test(sub_obj, result_obj[i]);
                        if(prevSet === null){
                            prevSet = temp;
                        } else {
                            prevSet = Intersection(prevSet, temp);
                        }

                        break;
                }

            }
            
            return prevSet;
        }

        //NOTE: requirements always have at least 1 requirement, which is first_name = ""
        return Test(requirements, result) || {};

    }

    //-------- Below are functions for searching to delete an entry --------------

    let Search_Entry = async (value, ptr, tag)=>{

        let vSplit = value.toLowerCase().split("");

        let {key} = tag;

        let recursion = async (i, sub_ptr)=>{

            delete sub_ptr.storage[key];

            if(i >= vSplit.length){
                return;
            }

            let c = vSplit[i];
            
            if(sub_ptr[c] === null){
                return;
            }

            await recursion(i+1, sub_ptr[c]);

        };

        for(let i = 0; i < vSplit.length; i++){
            await recursion(i, ptr);
        }

    };

    let Search_JSON = async (Obj, key, entry)=>{

        //Create a pointer for the active_streams
        let ptr = this.store_obj[key];

        //Expecting the object to be an array instead of a pure Json object
        for(let i in Obj){
            
            //Picking an entry out from the array
            let subObj = Obj[i];

            //Each entry should be a pure Json object, example: {name1: "abc", name2: "def"}
            for(let j in subObj){

                if(ptr[j] === undefined){
                    continue;
                }

                Search_Entry(subObj[j], ptr[j], entry);
            }
        }        

    };

    this.Delete_Entry = async (entry)=>{

        for(let i in entry){

            if(this.store_obj[i] === undefined){
                continue;
            }

            try {

                let jsonObj = JSON.parse(entry[i]);

                await Search_JSON(jsonObj, i, entry);

            }catch(e){

                await Search_Entry(entry[i], this.store_obj[i], entry);

            }
        }

    };    

};

export default Gather_Namespaces;