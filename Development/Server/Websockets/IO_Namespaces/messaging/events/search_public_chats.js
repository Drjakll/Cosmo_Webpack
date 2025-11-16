let Wrapper = function(){

    this.event = async ({search_req}) => {

        if(!search_req || Object.keys(search_req).length === 0){
            search_req = {channel_name: ""}; //Must have at least 1 requirement to find results
        }
        
        let results = await this.channel_storage.Search(search_req);

        this.socket.emit('catch_public_chats', {channels: results});
    };
    
};

export default Wrapper;

