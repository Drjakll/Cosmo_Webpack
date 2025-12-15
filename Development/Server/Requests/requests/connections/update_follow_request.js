let request = function () {

    this.req = (req, res)=>{

        let { connection_id, from_id, to_id, status } = req.body;

        let query = `
            update
                Connections
            set
                status = '${status}'
            where
                id = ${connection_id || 0} or (follower_id = ${from_id} and followed_id = ${to_id});
        `;

        this.sql.query(query, (err, result) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error updating follow request"});

            } else {

                res.json({message: "Successfully updating follow request!"});
            }

            res.end();
        });
    };
};

export default request;