import { Server } from 'socket.io';
import GatherRequests from './Socket_Requests/socket_requests.js';

let io;

var connectedClients = {};

var clientsID = [];

let websocket = async (server) => {
    
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    });
   
    
    let socket_requests = await GatherRequests(`${__dirname}/../Development/Server/Websockets/Socket_Requests/socket_requests/`, connectedClients, clientsID, io);
    
 
    io.on('connection', (socket)=>{

        connectedClients[socket.id] = socket;
        
        clientsID.push(socket.id);
        
        setTimeout(()=>{
            
            socket.emit('connected', '{}');
            
        }, 3000);
        
        
        //WebRTC callbacks
   
        socket.on('register', socket_requests.webrtc_functions.register.request);
        
        socket.on('add_candidate', socket_requests.webrtc_functions.add_candidate.request);
        
        socket.on('offer', socket_requests.webrtc_functions.offer.request);
        
        socket.on('response', socket_requests.webrtc_functions.response.request);
        
        
        
        //Regular messaging callbacks
        
        socket.on('send_pm', socket_requests.messaging.receive_private_message.request);
        
        
        socket.on('disconnect', (reason)=>{
            
            delete connectedClients[socket.id];
            
            console.log(`${socket.id} has disconnected!`);
            
            for(let key in connectedClients){

                if(key === socket.id){
                    continue;
                }
              

                let client = connectedClients[key];

                client.emit('someone_dc', JSON.stringify({id: socket.id}));

            }
            
        });
        
    });
};

export default websocket;
