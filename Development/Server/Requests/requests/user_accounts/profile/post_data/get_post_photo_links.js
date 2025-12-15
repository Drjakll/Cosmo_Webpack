let request = function () {

    this.req = (req, res) => {

        let post = req.body;

        if (!post || !post.owner_email || !post.id) {
            res.json({ message: "Invalid post data provided", photos: [] });
            res.end();
            return;
        }

        let query = `select * from Post_Photos where owner_email = '${post.owner_email}' and belongs_to_post = ${post.id}`;

        this.sql.query(query, (err, results) => {

            if (err) {
                console.log(query, err.sqlMessage);
                res.json({ message: "Error retreiving photos", photos: [] });
            } else if (results.length === 0) {
                res.json({ message: "No data retrieved", photos: [] });
            } else {
                res.json({ message: "Successfully retrieved photos!", photos: results });
            }

            res.end();

        });

    };
};

export default request;

