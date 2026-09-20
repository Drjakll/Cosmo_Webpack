let Wrapper = function () {

    this.event = ({ to, answer }) => {

        let {tag: from} = this.my_socket;

        if(!to || 
            from.stream_id !== to.stream_id || 
            !Object.hasOwn(this.all_sockets[to.stream_id], to.id) ||
            !this.all_sockets[to.stream_id][to.id].tag.can_go_live
        ){
            return;
        }

        this.io.to(to.id).emit('receive_answer', { from, answer });
        
    };

};

export default Wrapper;

