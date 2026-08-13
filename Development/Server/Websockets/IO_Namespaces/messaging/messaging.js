import fs from 'fs';
import { parse } from 'path';

//This is a intended for a trie data structure
let Existing_Public_Channels = {
    channel_name: null
};

let Wrapper = function (){

    //An object that which has the user_id as key and socket as value
    this.user_socket = {};

    this.channel_storage = new this.storage(Existing_Public_Channels);

    //This is to have a list of all the channel names in a list. It is for checking if channel name exists and/or who are the users currently in the channel
    this.public_channel_list = {};
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/messaging/events/`;

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
        socket.public = {rooms_joined: {}};
        socket.private = {rooms_joined: {}};
        
        for(let i in this.events){
            events[i] = new this.events[i]();
            
            events[i].socket = socket;
            events[i].io = this.io;
            events[i].root_io = this.root_io;
            events[i].channel_storage = this.channel_storage;
            events[i].existing_public_channels = Existing_Public_Channels;
            events[i].user_socket = this.user_socket;
            events[i].public_channel_list = this.public_channel_list;
        }

        //console.log("connected: messagings", socket.id);

        socket.on("disconnect", (reason) => {
            //console.log("disconnected: messaging", socket.id, reason);
        });

        socket.on("error", (err) => {
            //console.log("socket error: messaging", err);
        });

        for(let key in events){

            socket.on(key, events[key].event);

        }


    };
};

export default Wrapper;

