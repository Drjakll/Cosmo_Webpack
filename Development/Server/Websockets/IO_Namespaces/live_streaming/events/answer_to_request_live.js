let Wrapper = function(){
    
    this.event = (data) => {
        
        let {to, answer} = data;
        
        this.io.to(to.id).emit('receive_answer_to_go_live', {answer: answer});
        
    };
    
};

export default Wrapper;

