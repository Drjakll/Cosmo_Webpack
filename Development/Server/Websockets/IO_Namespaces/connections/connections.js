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
    
    this.user_email = {};

    this.namespace = (socket) => {
        
        let events = {};
        
        for(let i in this.events){
            events[i] = new this.events[i]();
            
            events[i].socket = socket;
            events[i].io = this.io;
            events[i].user_email = this.user_email;
        }
        
        socket.on("newly_logged_in", events.newly_logged_in.event);
        socket.on("refresh_account", events.refresh_account.event);
        socket.on("logging_off", events.logging_off.event);
    };
};

export default Wrapper;

