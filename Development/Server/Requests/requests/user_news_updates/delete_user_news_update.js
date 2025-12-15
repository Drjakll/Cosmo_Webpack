let request = function () {

    this.req = (req, res) => {

        let { user_news_updates_id } = req.body;

        let query = `delete from User_News_Updates where id = ${user_news_updates_id}`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting news update"});
            } else {
                res.json({message: "Successfully deleted news update!"});
            }

            res.end();

        });
    };

};

export default request;


