let Wrapper = function(){

    this.event = ({private_conversations, user_id}) => {
        
        for(let room_tag in private_conversations){

            room_tag = parseInt(room_tag);

            this.socket.join(room_tag);

            this.socket.private.rooms_joined[room_tag] = room_tag;
            
            //The reason why massive_send_out is true is because this report is sent out to the mass amount of users
            this.io.to(room_tag).emit('report_private_online', {user_id, room_tag, massive_send_out: true});
        }

    };
    
};

export default Wrapper;

