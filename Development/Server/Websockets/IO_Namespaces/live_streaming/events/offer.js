let Wrapper = function () {

    this.event = ({ to, local_offer }) => {

        let {tag: from} = this.my_socket;
        

        if(!to || 
            to.stream_id !== from.stream_id ||
            !Object.hasOwn(this.all_sockets[to.stream_id], to.id) ||
            !from.can_go_live
        ){
            return;
        }

        this.io.to(to.id).emit('receive_offer', { from, remote_offer: local_offer });

    };

};

export default Wrapper;

