let request = function () {

    let Modify_Query = (original_query, connection_list)=>{

        for(let i in connection_list){

            let {email} = connection_list[i];

            original_query += `owner_email = '${email}}' or `
        }

        return original_query.slice(0, -4);
    }

    this.req = (req, res) => {

        let { connection_list } = req.body;

        let query = Modify_Query(`select * from User_News_Updates where `, connection_list);

        this.sql.query(query, (err, results) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error deleting news update", results: []});
            } else {
                res.json({message: "Successfully deleted news update!", results: results});
            }

            res.end();

        });
    };

};

export default request;


