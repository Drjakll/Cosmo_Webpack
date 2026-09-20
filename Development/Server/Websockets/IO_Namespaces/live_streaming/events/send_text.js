let Wrapper = function () {

    this.event = ({ text }) => {

        let {tag: from, user_info: account_data} = this.my_socket;

        if(!from){
            return;
        }

        let { stream_id } = from;

        this.io.to(stream_id)?.emit('receive_new_text', 
            { from_room_tag: from, 
                text, 
                from_account: account_data 
            });

    };

};

export default Wrapper;

