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
        }

        //console.log("connected: connections", socket.id);

        socket.on("error", (err) => {
            //console.log("socket error: connections", err);
        });

        for(let key in events){

            socket.on(key, events[key].event);

        }
        /*
        socket.on('ping', events.pong.event);
        socket.on("newly_logged_in", events.newly_logged_in.event);
        socket.on("refresh_alerts", events.refresh_alerts.event);
        socket.on("logging_off", events.logging_off.event);
        socket.on("refresh_account", events.refresh_account.event);
        socket.on("refresh_group_alerts", events.refresh_group_alerts.event);
        socket.on("refresh_connection_list", events.refresh_connection_list.event);
        */
    };
};

export default Wrapper;

