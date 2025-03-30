let socket_request = function(){
    
    this.request = (data) => {
        
        let {from, to, candidate} = typeof data === "string" ? JSON.parse(data) : data;

        this.connectedClients[to]?.emit('new_candidate', JSON.stringify({from: from, candidate: candidate}));

    };
    
};

export default socket_request;




