let Wrapper = function(){

    this.event = async ({search_req}) => {

        if(!search_req || Object.keys(search_req).length === 0){
            search_req = {channel_name: ""}; //Must have at least 1 requirement to find results
        }
        
        let results = await this.channel_storage.Search(search_req);

        for(let i in results){

            let number_of_users = Object.keys(this.public_channel_list[results[i].channel_name]?.online_users || {}).length;

            results[i].number_of_users = number_of_users;
        }

        this.socket.emit('catch_public_chats', {channels: results});
    };
    
};

export default Wrapper;

