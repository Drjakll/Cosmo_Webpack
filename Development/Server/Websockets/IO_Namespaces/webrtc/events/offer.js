let Wrapper = function () {

    this.event = ({ to, from, local_description }) => {

        this.io.to(to.id).emit('receive_offer', { from: from, remote_description: local_description });

    };

};

export default Wrapper;

