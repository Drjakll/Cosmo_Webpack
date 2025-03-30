import fs from 'fs';

let GatherRequests = async function(path, connectedClients, clientsID, io){
    
    let req_objs = {};
    
    let entries = await fs.readdirSync(path);
    
    for await (let file of entries){
        
        let subPath = `${path}${file}`;

        const isDir = fs.lstatSync(subPath).isDirectory();
        
        if (isDir) {

            req_objs[file] = await GatherRequests(subPath + "/", connectedClients, clientsID, io);

        } else {
            
            let key = file.split('.')[0];
            
            req_objs[key] = await import("./" + subPath.split("Socket_Requests/")[1]);
            
            req_objs[key] = req_objs[key].default;
            
            req_objs[key].prototype.connectedClients = connectedClients;
            
            req_objs[key].prototype.clientsID = clientsID;
            
            req_objs[key].io = io;
            
            req_objs[key] = new req_objs[key]();
            
        }
    }

    return req_objs;
};


export default GatherRequests;


