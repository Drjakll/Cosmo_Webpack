import fs from 'fs';

let Wrapper = function ({session_sockets}){

    this.online_users = {}; //User's id mapped to their account
    this.online_user_sockets = {}; //User's socket id mapped to their account
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/global_events/events/`;

        let entries = fs.readdirSync(path);

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
            events[i] = new this.events[i]({session_sockets});

            events[i].socket = socket;
            events[i].root_io = this.root_io;
            events[i].online_users = this.online_users;
            events[i].online_user_sockets = this.online_user_sockets;

            events[i].middleware_wrapper = new this.middleware_wrapper({socket});

            let middleware_names = events[i].middleware_names;

            if(middleware_names){

                for(let name of middleware_names){

                    let middleware = this.middlewares[name];

                    events[i].middleware_wrapper.add_to_middleware(middleware);

                }
                
            } 

            events[i].middleware_wrapper.add_to_middleware(events[i].event);
        }

        //console.log("connected: global_events", socket.id);

        socket.on("error", (err) => {
            //console.log("socket error: global_events", err);
        });

        for(let key in events){

            let {run_middlewares} = events[key].middleware_wrapper;

            socket.on(key, run_middlewares);

        }

    };
};

export default Wrapper;