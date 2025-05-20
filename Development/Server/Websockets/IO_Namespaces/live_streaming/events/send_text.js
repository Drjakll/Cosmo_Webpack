let Wrapper = function () {

    this.event = ({ from, text }) => {

        let { stream_id } = from;

        this.io.to(stream_id).emit('receive_new_text', { from: from, text: text });

    };

};

export default Wrapper;

