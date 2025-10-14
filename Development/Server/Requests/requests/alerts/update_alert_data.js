let request = function () {

    let alert_types = {
        post: "post_id_ref",
        photo_album: "photo_albums_id_ref",
        profile_picture: "profile_picture_id_ref",
        photo_link: "user_photo_links_id_ref",
        photo_comment: "photo_comments_id_ref",
        connection_request: "connection_request_id_ref",
    };

    this.req = (req, res) => {

        let { alert_id, data, type, type_id } = req.body;

        let query = `update User_Alerts set alert_data = '${JSON.stringify(data || {})}' where id = ${alert_id} or ${alert_types[type]} = ${type_id}`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error updating alert data"});
            } else {
                res.json({message: "Successfully updated alert data!"});
            }

            res.end();

        });
    };

};

export default request;


