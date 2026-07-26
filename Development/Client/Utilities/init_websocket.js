import { io } from 'socket.io-client';

function init_websocket(namespace, reinit_callback = null, offline_callback = null){


    let socket = io(namespace, {
                    transports: ["websocket"],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 2000,
                    reconnectionDelayMax: 10000,
                    timeout: 10000
                });;

    let destroyed = false;

    //Cleaning up after socket get disconnected
    function cleanup(e) {
        
        if(destroyed){
            return;
        }

        destroyed = true;

        window.removeEventListener("beforeunload", cleanup);

        if (socket) {
            socket.removeAllListeners();
            socket.disconnect();
            socket = null;
        }
    }

    socket.on("connect_error", error => {
        console.error(
            namespace,
            "connect_error:",
            error.message
        );
    });

    socket.on("disconnect", reason => {
        //console.log(namespace, " socket disconnected ",reason);
    });

    socket.io.on("reconnect_attempt", attempt => {
        //console.log( namespace, "reconnect attempt:", attempt);
    });

    socket.io.on("reconnect", attempt => {
        //console.log(namespace,"reconnected after attempt:",attempt);
    });

    socket.on("connect_error", err => {
        //console.log("connect_error:", err.message);
    });

    socket.io.on("reconnect_failed", () => {

        console.error(namespace, "reconnection failed");

        reinit_callback?.(true);

    });

    window.addEventListener("beforeunload", cleanup);

    return socket;
}

export default init_websocket;