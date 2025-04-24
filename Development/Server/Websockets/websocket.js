import { Server } from 'socket.io';
import Gather_Namespaces from './IO_Namespaces/io_namespaces.js';

let websocket = async (server) => {
    
    let io = new Server(server, {
                                    cors: {
                                        origin: '*'
                                    }
                                });
    
    //Gather all the namespaces
    let namespaces = await Gather_Namespaces(io);
    
    
    
    const photo_comments_namespace = io.of('/photo_comments');
    
    namespaces.photo_comments.io = photo_comments_namespace;
    
    
    
    photo_comments_namespace.on('connection', namespaces.photo_comments.namespace);
};

export default websocket;
