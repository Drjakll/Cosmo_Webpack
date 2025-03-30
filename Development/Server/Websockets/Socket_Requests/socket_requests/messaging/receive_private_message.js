let socket_request= function(){
    
    this.request = ({senderID, recipientID, msg})=>{
        
        let clients = this.connectedClients;
        
        clients[recipientID].emit("recieve_pm", {msg: msg, sender_info: clients[senderID].user_info });
        
    };
    
};

export default socket_request;


