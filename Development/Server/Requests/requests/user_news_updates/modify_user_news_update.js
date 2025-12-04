let request = function () {

    let news_type = {
        album: "album_id",
        user_accounts: "user_account_id",
        post: "post_id"
    };

    this.req = (req, res) => {

        let {news_id, news_type_id, type, news_data , message} = req.body;

        let query = `update User_News_Updates set 
                                news_data = '${typeof news_data === "object" ? JSON.stringify(news_data) : news_data}', 
                                message = '${message}' 
                                where id = ${news_id} or
                                ${news_type[type]} = ${news_type_id}
                                `;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error adding a news update"});
            } else {
                res.json({message: "Successfully added a news update!"});
            }
            
            res.end();

        });
    };

};

export default request;


