import fs from 'fs';

let Wrapper = function (){
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/photo_comments/events/`;

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
            events[i].io = this.io;
        }

        //console.log("connected: photo_comments", socket.id);

        socket.on("disconnect", (reason) => {
            //console.log("disconnected photo_comments:", socket.id, reason);
        });

        socket.on("error", (err) => {
            //console.log("socket error: photo_comments", err);
        });
        
        socket.on('ping', events.pong.event);
        socket.on('join_comment_group', events.join_comment_group.event);
        socket.on('reload_comments_to_all', events.reload_comments_to_all.event);
        
    };
};

export default Wrapper;

