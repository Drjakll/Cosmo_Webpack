import { Server } from 'socket.io';
import Gather_Namespaces from './IO_Namespaces/io_namespaces.js';

let websocket = async (server) => {
    
    let io = new Server(server, {
                                    cors: 
                                            {
                                                origin: '*'
                                            }
                                }
                        );
    
    //Gather all the namespaces
    let namespaces = await Gather_Namespaces(io);
    
    
    
    const photo_comments_namespace = io.of('/photo_comments');
    const video_streams_namespace = io.of('/video_streams');
    const connections_namespace = io.of('/connections');
    const messaging_namespace = io.of('/messaging');
    
    //Passing the io object to the namespaces
    namespaces.photo_comments.io = photo_comments_namespace;
    namespaces.live_streaming.io = video_streams_namespace;
    namespaces.connections.io = connections_namespace;
    namespaces.messaging.io = messaging_namespace;

    //Checking every 10 seconds if any socket has not been pinged for over 11 seconds
    setInterval(async ()=>{

        let email_socket = namespaces.messaging.email_socket;

        let time_now = Date.now();

        for(let email in email_socket){

            let soc = email_socket[email];

            if(time_now - soc.last_pinged > 11000){

                for(let name in soc.rooms_joined){

                    messaging_namespace.to(name).emit('report_offline', {room_tag: name, email});

                }

                delete email_socket[email];
            }
        }


    }, 10000);
    
    
    photo_comments_namespace.on('connection', namespaces.photo_comments.namespace);
    video_streams_namespace.on('connection', namespaces.live_streaming.namespace);
    connections_namespace.on('connection', namespaces.connections.namespace);
    messaging_namespace.on('connection', namespaces.messaging.namespace);
};

export default websocket;
