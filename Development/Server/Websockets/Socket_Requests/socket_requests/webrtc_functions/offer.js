let socket_request = function(){
    
    this.request = (data) => {
        
        let {from, to, offer} = typeof data === "string" ? JSON.parse(data) : data;

        this.connectedClients[to]?.emit('answer', JSON.stringify({from: from, offer: offer}));
        
        console.log(`${to} has answered ${from}`);
    };
    
};

export default socket_request;




