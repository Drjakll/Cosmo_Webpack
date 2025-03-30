let socket_request = function(){
    
    this.request = (data) => {
        
        let {to_id, from, answer} = typeof data === "string" ? JSON.parse(data) : data;

        let client = this.connectedClients[to_id];

        client?.emit('handle_response', JSON.stringify({answer: answer, from: from}));
        
        console.log(`${to_id} handling the response from ${from}`);
    };
    
};

export default socket_request;




