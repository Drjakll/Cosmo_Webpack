import fs from 'fs';

let Existing_Public_Channels = {
    channel_name: null
};

let Wrapper = function (){

    //An object that which has the email as key and socket as value
    this.email_socket = {};

    this.channel_storage = new this.storage(Existing_Public_Channels);
    
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
        socket.rooms_joined = {};
        
        for(let i in this.events){
            events[i] = new this.events[i]();
            
            events[i].socket = socket;
            events[i].io = this.io;
            events[i].root_io = this.root_io;
            events[i].channel_storage = this.channel_storage;
            events[i].existing_public_channels = Existing_Public_Channels;
            events[i].email_socket = this.email_socket;
        }

        socket.on('report_presence', events.report_presence.event);
        socket.on('join_private_channels', events.join_private_channels.event);
        socket.on('join_single_private_channel', events.join_single_private_channel.event);
        socket.on('send_msg_to_channel', events.send_msg_to_channel.event);
        socket.on('refresh_conversation_list', events.refresh_conversation_list.event);
        socket.on('leave_conversation', events.leave_conversation.event);
        socket.on('update_seen_by', events.update_seen_by.event);
        socket.on('clear_seen_by', events.clear_seen_by.event);
        socket.on('ping', events.ping.event);
        socket.on('send_report_online', events.send_report_online.event);
        socket.on('create_public_channel', events.create_public_channel.event);

    };
};

export default Wrapper;

