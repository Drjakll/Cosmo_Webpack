let Wrapper = function(){
    
    this.event = async ({from, host}) => {
        
        let { tag } = this.my_socket;

        if (!tag) {
            return;
        }

        let { stream_id } = tag;

        this.io.to(stream_id).emit('stop_streaming', { from });

    };
    
};

export default Wrapper;