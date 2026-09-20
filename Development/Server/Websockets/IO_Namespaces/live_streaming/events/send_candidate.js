let Wrapper = function () {

    this.event = ({to, candidate }) => {

        let {tag: from} = this.my_socket;

        if(!to || 
            from.stream_id !== to.stream_id || 
            !Object.hasOwn(this.all_sockets[to.stream_id], to.id)){
            return;
        }

        this.io.to(to.id).emit('receive_candidate', { from, candidate });

    };

};

export default Wrapper;

