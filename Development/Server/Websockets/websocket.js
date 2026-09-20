import { Server } from 'socket.io';
import Gather_Namespaces from './IO_Namespaces/io_namespaces.js';
import {Gather_Middlewares, Middleware_Wrapper} from './Middlewares/middlewares.js';

const allowedOrigins = [
    "https://www.cosmo-one.com",
    "http://localhost:8080",
    "https://localhost:8080",
    "https://10.0.0.97:8080",
    "https://172.16.0.214:8080"

];

let websocket = async (server, sql) => {

    let session_sockets = {};
    
    let io = new Server(server, {
                                    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
                                    cors: {
                                        origin: [...allowedOrigins],
                                        credentials: true
                                    },
                                    allowRequest: (req, callback) => {

                                        const {origin} = req.headers;
                                        
                                        const is_allowed = allowedOrigins.includes(origin);

                                        if(!is_allowed){
                                            console.log(origin + " is not allowed");
                                        }

                                        callback(null, is_allowed);
                                        
                                    },
                                    pingInterval: 25000,
                                    pingTimeout: 20000
                                }
                            );
    
    //Gather all the namespaces
    let namespaces = await Gather_Namespaces({io, session_sockets});
    let middlewares = await Gather_Middlewares({sql, session_sockets});

    io.engine.on("connection_error", (err) => {
        console.log("engine connection error:");
        console.log("code:", err.code);
        console.log("message:", err.message);
        console.log("context:", err.context);
    });
    
    //The namespace_io keys have to match with the folder in IO_Namespaces
    let namespace_io = {
        photo_comments: io.of('/photo_comments'),
        live_streaming: io.of('/video_streams'),
        connections: io.of('/connections'),
        messaging: io.of('/messaging'),
        comments: io.of('/comment_room'),
        reactions: io.of('/reaction_room'),
        global_events: io.of('/global_events')
    };

    for(let key in namespace_io){

        namespaces[key].io = namespace_io[key];
        
        namespaces[key].middlewares = middlewares;
        namespaces[key].middleware_wrapper = Middleware_Wrapper;

        namespace_io[key].use(middlewares.user_auth);
        namespace_io[key].use(middlewares.register_session_socket);
        namespace_io[key].on('connection', namespaces[key].namespace);
    }

    return io;
};

export default websocket;
