let socket_request = function(){
    
    this.request = (data) => {
        
        let {id, user_info} = typeof data === "object" ? data : JSON.parse(data);


        let socket = this.connectedClients[id];

        socket.user_info = user_info;

        socket?.emit('broadcast_offers', JSON.stringify({clients_id: this.clientsID}));
        
        console.log(`${id} has broadcasted offers`);
    };
    
};

export default socket_request;




