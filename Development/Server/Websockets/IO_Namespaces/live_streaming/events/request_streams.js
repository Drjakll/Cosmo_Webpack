let Wrapper = function(){

    
    this.event = async (search) => {

        if(!search){
            return;
        }

        if(Object.keys(search).length === 0){
            search.first_name = ""; //Must have at least 1 requirement to find results
        }

        let result = await this.storage.Search(search);
        
        this.my_socket.emit('catch_streams', {streams: result});
        
    };
    
};

export default Wrapper;

