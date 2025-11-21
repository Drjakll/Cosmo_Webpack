import fs from 'fs';

//This is a intended for a trie data structure
let Existing_Public_Channels = {
    channel_name: null
};

let Wrapper = function (){

    //An object that which has the email as key and socket as value
    this.email_socket = {};

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
            events[i].email_socket = this.email_socket;
            events[i].public_channel_list = this.public_channel_list;
        }

        socket.on('report_presence', events.report_presence.event);
        socket.on('join_private_channels', events.join_private_channels.event);
        socket.on('join_single_private_channel', events.join_single_private_channel.event);
        socket.on('send_msg_to_channel', events.send_msg_to_channel.event);
        socket.on('refresh_conversation_list', events.refresh_conversation_list.event);
        socket.on('leave_private_conversation', events.leave_private_conversation.event);
        socket.on('update_seen_by', events.update_seen_by.event);
        socket.on('clear_seen_by', events.clear_seen_by.event);
        socket.on('ping', events.ping.event);
        socket.on('send_report_online', events.send_report_online.event);
        socket.on('join_public_channels', events.join_public_channels.event);
        socket.on('search_public_chats', events.search_public_chats.event);
        socket.on('leave_public_channel', events.leave_public_channel.event);

        //Checking every 10 seconds if any socket has not been pinged for over 11 seconds
        setInterval(async ()=>{

            let email_socket = this.email_socket;
            let public_channel_list = this.public_channel_list;

            let time_now = Date.now();

            for(let email in email_socket){

                let soc = email_socket[email];

                if(time_now - soc.last_pinged > 11000){

                    for(let name in soc.private.rooms_joined){

                        this.io.to(name).emit('report_private_offline', {room_tag: name, email});

                    }        

                    delete email_socket[email];

                    for(let name in soc.public.rooms_joined){

                        this.io.to(name).emit('report_public_offline', {room_tag: name, email});

                        //Delete the online user from the public record
                        delete public_channel_list[name]?.online_users[email];

                    }
                }
            }


        }, 10000);

    };
};

export default Wrapper;

