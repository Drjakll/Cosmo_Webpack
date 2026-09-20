import fs from 'fs';

let Wrapper = function (){
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/connections/events/`;

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
    
    this.user_sockets = {};

    this.namespace = (socket) => {
        
        let events = {};
        
        for(let i in this.events){
            events[i] = new this.events[i]();
            
            events[i].socket = socket;
            events[i].io = this.io;
            events[i].root_io = this.root_io;
            events[i].user_sockets = this.user_sockets;
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

