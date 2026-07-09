import { Server } from 'socket.io';
import Gather_Namespaces from './IO_Namespaces/io_namespaces.js';

let websocket = async (server) => {
    
    let io = new Server(server, {
                                    cors: 
                                            {
                                                origin: '*'
                                            },
                                    methods: ["GET", "POST"],
                                    pingInterval: 25000,
                                    pingTimeout: 60000
                                }
                        );
    
    //Gather all the namespaces
    let namespaces = await Gather_Namespaces(io);

    io.engine.on("connection_error", (err) => {
        console.log("engine connection error:");
        console.log("code:", err.code);
        console.log("message:", err.message);
        console.log("context:", err.context);
    });
    
    
    const photo_comments_namespace = io.of('/photo_comments');
    const video_streams_namespace = io.of('/video_streams');
    const connections_namespace = io.of('/connections');
    const messaging_namespace = io.of('/messaging');
    const comments_namespace = io.of('/comment_room');
    const reactions_namespace = io.of('/reaction_room');
    const global_events_namespace = io.of('/global_events');
    
    //Passing the io object to the namespaces
    namespaces.photo_comments.io = photo_comments_namespace;
    namespaces.live_streaming.io = video_streams_namespace;
    namespaces.connections.io = connections_namespace;
    namespaces.messaging.io = messaging_namespace;
    namespaces.comments.io = comments_namespace;
    namespaces.reactions.io = reactions_namespace;
    namespaces.global_events.io = global_events_namespace;
    
    photo_comments_namespace.on('connection', namespaces.photo_comments.namespace);
    video_streams_namespace.on('connection', namespaces.live_streaming.namespace);
    connections_namespace.on('connection', namespaces.connections.namespace);
    messaging_namespace.on('connection', namespaces.messaging.namespace);
    comments_namespace.on('connection', namespaces.comments.namespace);
    reactions_namespace.on('connection', namespaces.reactions.namespace);
    global_events_namespace.on('connection', namespaces.global_events.namespace);
};

export default websocket;
