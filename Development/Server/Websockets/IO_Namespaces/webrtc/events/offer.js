let Wrapper = function () {

    this.event = ({ to, from, local_offer }) => {

        this.io.to(to.id).emit('receive_offer', { from: from, remote_offer: local_offer });

    };

};

export default Wrapper;

