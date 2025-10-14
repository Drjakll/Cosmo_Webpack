let Wrapper = function () {

    this.event = ({ from, text, account_data }) => {

        if(!from){
            return;
        }

        let { stream_id } = from;

        this.io.to(stream_id)?.emit('receive_new_text', { from_room_tag: from, text: text, from_account: account_data });

    };

};

export default Wrapper;

