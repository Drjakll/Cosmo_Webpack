import fs from 'fs';

function request({sql}) {

    this.req_path = "/get_frontend_file_dir";
    this.req_type = "get";
    this.callbacks = ["get_frontend_file_dir"];

    let root = `${__dirname}/../Development/Client/`;

    const recursion = async (dir_paths, entry_obj, current_root) => {

        for(let path of dir_paths){

            let isDir = (await fs.promises.lstat(current_root + path)).isDirectory();

            if(isDir){

                let sub_paths = await fs.promises.readdir(current_root + path);

                entry_obj[path] = await recursion(sub_paths, {}, current_root + path + "/");

            } else {

                entry_obj[path] = path;

            }

        }
        
        return entry_obj;
    };

    this.req = async (req, res)=>{

        let entries = await fs.promises.readdir(root);

        let entry_data = await recursion(entries, {}, root);


        res.json({entry_data});

    };
};

export default request;