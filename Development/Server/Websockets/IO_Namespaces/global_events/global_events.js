import fs from 'fs';

let Wrapper = function (){

    this.online_users = {};
    
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
        }
        
        socket.on('report_online', events.report_online.event);
        socket.on('who_is_online', events.who_is_online.event);
        socket.on('report_offline', events.report_offline.event);
        socket.on('report_update_followers', events.report_update_followers.event);
        socket.on('report_update_followings', events.report_update_followings.event);
    };
};

export default Wrapper;