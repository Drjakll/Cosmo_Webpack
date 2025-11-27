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
    const post_comments_namespace = io.of('/post_comments');
    
    //Passing the io object to the namespaces
    namespaces.photo_comments.io = photo_comments_namespace;
    namespaces.live_streaming.io = video_streams_namespace;
    namespaces.connections.io = connections_namespace;
    namespaces.messaging.io = messaging_namespace;
    namespaces.post_comments.io = post_comments_namespace;

    
    photo_comments_namespace.on('connection', namespaces.photo_comments.namespace);
    video_streams_namespace.on('connection', namespaces.live_streaming.namespace);
    connections_namespace.on('connection', namespaces.connections.namespace);
    messaging_namespace.on('connection', namespaces.messaging.namespace);
    post_comments_namespace.on('connection', namespaces.post_comments.namespace);
};

export default websocket;
