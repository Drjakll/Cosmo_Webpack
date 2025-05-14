let Wrapper = function () {

    this.event = (data) => {

        let { to, from, local_description } = JSON.parse(data);

        this.io.to[to.id].emit('receive_local_description', { from: from, local_description: local_description });

    };

};

export default Wrapper;

