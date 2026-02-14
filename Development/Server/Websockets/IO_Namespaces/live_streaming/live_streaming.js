import fs from 'fs';

//Each one of the item in the active_streams will get updated an array of letter_array, which is stored in create_stream.js
let active_streams = {
    first_name: null,
    last_name: null,
    marital_status: null,
    gender: null,
    date_of_birth: null,
    User_Locations: {
        "state": null,
        "city": null,
        "country": null,
        "start_date": null,
        "end_date": null,
        "location_type": null
    },
    User_Hobbies: {
        "hobby_name": null,
        "proficiency": null,
        "start_date": null,
        "story": null        
    },
    User_Schools: {
        "school_type": null,
        "start_date": null,
        "end_date": null,
        "school_name": null,
        "city": null,
        "state": null,
        "country": null
    },
    User_Professions: {
        "profession_name": null,
        "profeciency": null,
        "start_date": null
    }
};

let Wrapper = function (){
    
    this.all_sockets = {};

    this.streams_storage = new this.storage(active_streams);
    
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
            events[i].root_io = this.root_io;
            events[i].storage = this.streams_storage;
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
        socket.on('acknowledge_new_viewer', events.acknowledge_new_viewer.event);
        socket.on('request_to_go_live', events.request_to_go_live.event);
        socket.on('answer_to_request_live', events.answer_to_request_live.event);
    };
};

export default Wrapper;

