let request = function () {


    this.req = (req, res) => {

        let post_photos = req.body;

        let count = post_photos.length;

        let completed = 0;

        let recursion = (index) => {

            if (index >= count) {
                res.json({ message: `Added ${completed} out of ${count} entries` });
                res.end();
                return;
            }

            let photo = post_photos[index];

            let query = this.generate_insert_query("Post_Photos", photo);

            this.sql.query(query, (err, results) => {

                if (err) {
                    console.log(query, err.sqlMessage);
                } else {
                    completed++;
                }

                recursion(index + 1);

            });
        };

        recursion(0);

    };
};

export default request;

