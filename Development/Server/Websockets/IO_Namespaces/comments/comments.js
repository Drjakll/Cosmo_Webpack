import fs from 'fs';

let Wrapper = function (){
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/comments/events/`;

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

        //console.log("connected: comments", socket.id);


        socket.on("error", (err) => {
            //console.log("socket error: comments", err);
        });

        for(let key in events){

            socket.on(key, events[key].event);

        }
        
        /*
        socket.on('ping', events.pong.event);
        socket.on('join_comment_room', events.join_comment_room.event);
        socket.on('signal_reload_get_new_comment', events.signal_reload_get_new_comment.event);
        socket.on('signal_reload_parent_comments', events.signal_reload_parent_comments.event);
        socket.on('signal_reload_self_comments', events.signal_reload_self_comments.event);
        */

    };
};

export default Wrapper;

