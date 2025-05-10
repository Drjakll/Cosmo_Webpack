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
                    
                    namespaces[key].prototype.io = io;
                    
                    namespaces[key] = new namespaces[key]();
                }
            }
            
        }
    }
    
    return namespaces;
};

export default Gather_Namespaces;