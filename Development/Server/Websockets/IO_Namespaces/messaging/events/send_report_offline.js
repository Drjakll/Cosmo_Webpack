let Wrapper = function(){

    this.event = ({from_user_id}) => {

        let user_private_rooms = this.user_socket[from_user_id]?.private.rooms_joined;
        let user_public_rooms = this.user_socket[from_user_id]?.public.rooms_joined;
        
        for(let i in user_private_rooms){

            let room_tag = parseInt(user_private_rooms[i]);

            this.io.to(room_tag).emit('report_private_offline', {room_tag, user_id: from_user_id});
        }

        for(let i in user_public_rooms){

            let room_tag = user_public_rooms[i];

            this.io.to(room_tag).emit('report_public_offline', {room_tag, user_id: from_user_id});

        }

    };
    
};

export default Wrapper;

