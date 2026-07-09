import fs from 'fs';

let Wrapper = function (){

    this.online_users = {}; //User's id mapped to their account
    this.online_users_socket = {}; //User's socket id mapped to their account
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/global_events/events/`;

        let entries = await fs.readdirSync(path);

        for await (let entry of entries){

            let sub_path = `${path}${entry}`;

            const is_not_dir = !fs.lstatSync(sub_path).isDirectory();

            if(is_not_dir && entry.split('.')[1] === 'js'){

                let key = entry.split('.')[0];

                this.events[key] = await import(`./events/${entry}`);

                this.events[key] = this.events[key].default;

            }

        }
            
    })();
    
    
    this.namespace = (socket) => {
        
        let events = {};
        
        for(let i in this.events){
            events[i] = new this.events[i]();

            events[i].socket = socket;
            events[i].root_io = this.root_io;
            events[i].online_users = this.online_users;
            events[i].online_users_socket = this.online_users_socket;
        }

        //console.log("connected: global_events", socket.id);

        socket.on("error", (err) => {
            //console.log("socket error: global_events", err);
        });

        for(let key in events){

            socket.on(key, events[key].event);

        }

    };
};

export default Wrapper;