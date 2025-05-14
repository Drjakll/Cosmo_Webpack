let Wrapper = function () {

    this.event = ({from, to, candidate }) => {

        this.io.to(to.id).emit('receive_candidate', { from: from, candidate: candidate });

    };

};

export default Wrapper;

