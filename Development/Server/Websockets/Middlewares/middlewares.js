import fs from 'fs';

let Gather_Middlewares = async function({sql, session_sockets}){
    
    let middlewares = {};
    

    let traversal = async (root_path, relative_path = '') => {

        let filename_collections = fs.readdirSync(root_path);

        for await (let file_name of filename_collections){
        
            let new_path = `${root_path}/${file_name}`;
            let import_path = `${relative_path}${file_name}`;
            
            const is_dir = fs.lstatSync(new_path).isDirectory();
            
            if(!is_dir){

                let [name, ext] = file_name.split('.');
                
                if(ext === 'js'){

                    let func_obj = (await import(`./Middleware_Collections/${import_path}`)).default;

                    middlewares[name] = (new func_obj({sql, session_sockets})).middleware;

                }
                
            } else {

                await traversal(new_path, `${import_path}/`);

            }
        }

    }

    let path = `${__dirname}/../Development/Server/Websockets/Middlewares/Middleware_Collections`;

    await traversal(path);
    
    
    return middlewares;
};

//An object template to run all the added middlewares and to add middlewares
let Middleware_Wrapper = function({socket}){

    this.middleware_list = {current: null, next: null};

    this.add_to_middleware = (middleware)=>{

        if(this.middleware_list.current === null){
            
            this.middleware_list.current = middleware;
            return;

        }

        let ptr = this.middleware_list;

        while(ptr.next !== null){
            ptr = ptr.next;
        }

        ptr.next = {current: middleware, next: null};
    };

    this.run_middlewares = async (params)=>{

        if(params !== null && typeof params === "object"){
            params.socket = socket;
        }

        try {

            await go_to_next(params, this.middleware_list);

        } catch(err){

            console.log(err);
            
        }

    };

    let go_to_next = async (params, midware_list)=>{

        if(!midware_list){
            return;
        }

        await midware_list.current(params, async (error)=>{

            if(!midware_list || (error !== undefined && error !== null)){
                return;
            }

            await go_to_next(params, midware_list.next);

        });
        
    };

}

export default Gather_Middlewares;
export { Middleware_Wrapper, Gather_Middlewares};
