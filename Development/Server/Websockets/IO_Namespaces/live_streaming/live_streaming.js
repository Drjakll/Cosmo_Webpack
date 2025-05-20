import fs from 'fs';

let active_streams = {};

let Wrapper = function (){
    
    this.all_sockets = {};
    
    (async () => {
        
        this.events = {};

        let path = `${__dirname}/../Development/Server/Websockets/IO_Namespaces/live_streaming/events/`;

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
            
            events[i].my_socket = socket;
            events[i].io = this.io;
            events[i].active_streams = active_streams;
            events[i].all_sockets = this.all_sockets;
        }
        
        socket.on('create_stream', events.create_stream.event);
        socket.on('join_stream', events.join_stream.event);
        socket.on('request_streams', events.request_streams.event);
        socket.on('disconnect', events.disconnect_stream.event);
        socket.on('leave_stream', events.leave_stream.event);
        socket.on('to_new_viewer', events.to_new_viewer.event);
        socket.on('offer', events.offer.event);
        socket.on('answer_to_offer', events.answer_to_offer.event);
        socket.on('send_candidate', events.send_candidate.event);
        socket.on('send_text', events.send_text.event);
    };
};

export default Wrapper;

