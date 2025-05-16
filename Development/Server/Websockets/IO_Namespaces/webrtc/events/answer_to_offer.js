let Wrapper = function () {

    this.event = ({ from, to, answer }) => {

        this.io.to(to.id).emit('receive_answer', { from: from, answer: answer });
        
    };

};

export default Wrapper;

