let request = function () {

    let news_type = {
        album: "album_id",
        user_accounts: "user_account_id",
        post: "post_id"
    };

    this.req = (req, res) => {

        let { owner, news_data, type, id_ref, message} = req.body;

        let time_created = Date.now();

        let query = `insert into User_News_Updates (
                            owner_email, 
                            news_data, 
                            news_type, 
                            ${news_type[type]}, 
                            message,
                            time_created) 
                        values(
                            '${owner.email}', 
                            '${JSON.stringify(news_data || {})}', 
                            '${type}', 
                            ${id_ref}, 
                            '${message}', 
                            ${time_created})
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


