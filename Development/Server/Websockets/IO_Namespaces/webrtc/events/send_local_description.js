let Wrapper = function () {

    this.event = (data) => {

        let { to, from, local_description } = JSON.parse(data);

        this.all_sockets[to.id].emit('receive_local_description', JSON.stringify({ from: from, local_description: local_description }));

    };

};

export default Wrapper;

