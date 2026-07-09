let Wrapper = function(){

    this.event = () => {

        let user_id = this.socket.user_id;

        let user_private_rooms = this.socket?.private.rooms_joined;
        let user_public_rooms = this.socket?.public.rooms_joined;
        
        for(let i in user_private_rooms){

            let room_tag = parseInt(user_private_rooms[i]);

            this.io.to(room_tag).emit('report_private_offline', {room_tag, user_id: user_id});
        }

        for(let i in user_public_rooms){

            let room_tag = user_public_rooms[i];

            this.io.to(room_tag).emit('report_public_offline', {room_tag, user_id: user_id});

        }

        delete this.user_socket[user_id];

    };
    
};

export default Wrapper;

