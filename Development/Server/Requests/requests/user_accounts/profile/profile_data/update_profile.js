let request = function () {

    var update_photo_comments_profile_picture = (changes, acc) => {

        let credential = { email: acc.email };

        let query = this.generate_update_query("Photo_Comments", changes, credential);

        this.sql.query(query, (err, result) => {

            if (err) {
                console.log(err.sqlMessage);
            }

        });
    };
    
    this.req = (req, res) => { 
        
        let acc_details = req.body;
        
        let query = this.generate_update_query("User_Accounts", 
                                                acc_details, 
                                                {"email": acc_details.email});
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error updating profile data"});
            } else if (result.affectedRows === 0){
                res.json({message: "No account found"});
            } else {
                res.json({ message: "Profile data updated!" });

                let { first_name, last_name } = acc_details;

                //Need to update the Photo_Comments table as well
                update_photo_comments_profile_picture({ first_name: first_name, last_name: last_name }, acc_details);
            }
            
            res.end();
            
        });

    };
};

export default request;

