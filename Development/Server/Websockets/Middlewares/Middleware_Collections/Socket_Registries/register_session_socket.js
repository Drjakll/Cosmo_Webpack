import cookie from 'cookie';

let middleware = function({sql, session_sockets}){

    //This middleware is intended to use once for every new socket connection
    this.middleware = (socket, next)=>{

        let {session_id} = cookie.parse(socket.handshake.headers.cookie); 
        
        if(!session_id){
            return next(new Error("Session id not found!"));   
        }

        const sockets = (session_sockets[session_id] ??= {});

        const key = `${socket.nsp.name}:${socket.id}}`;

        sockets[key] = socket;

        socket.once('disconnect', ()=>{
            delete sockets[key];

            if(Object.keys(sockets).length === 0){
                delete session_sockets[session_id];
            }

        });

        next();
    };
};

export default middleware;