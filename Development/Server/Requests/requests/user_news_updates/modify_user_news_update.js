let request = function () {

    let news_type = {
        album: "album_id",
        user_accounts: "user_account_id",
        post: "post_id"
    };

    this.req = (req, res) => {

        let {news_id, type_id, type, data , message} = req.body;

        data = (typeof data === "object" ? JSON.stringify(data) : data).replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"');

        let query = `update User_News_Updates set 
                                news_data = '${data}', 
                                message = '${message}' 
                                where id = ${news_id} or
                                ${news_type[type]} = ${type_id}
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


