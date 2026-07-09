import { io } from 'socket.io-client';

function init_websocket(namespace, reinit_callback = null, offline_callback = null){


    let socket = io(namespace, {
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 2000,
                    reconnectionDelayMax: 10000,
                    timeout: 10000,
                    transports: ["websocket"]
                });;

    let interval_id = null;


    //Cleaning up after socket get disconnected
    function cleanup(e) {

        offline_callback && offline_callback(e);

        if (interval_id) {
            clearInterval(interval_id);
            interval_id = null;
        }

        if (socket) {
            socket.removeAllListeners();
            socket.disconnect();
            socket = null;
        }
    }

    socket.on("disconnect", reason => {
        cleanup();
    });

    socket.on("connect_error", err => {
        console.log("connect_error:", err.message);
    });


    //Setting up for the heart beat
    let pong = false;

    interval_id = setInterval(()=>{

        socket?.emit('ping', {});

        //Wait for 1 second for the pong to hit back from the backend, else reinitialize the socket
        setTimeout(()=>{

            if(!pong){

                //If reinit is given
                reinit_callback && reinit_callback(true);
            }

            pong = false;

        }, 1000);

    }, 30000);


    //Listening for pong after ping was sent
    socket.on('pong', ()=>{

        pong = true;

    });

    window.addEventListener("beforeunload", cleanup);

    return socket;
}

export default init_websocket;