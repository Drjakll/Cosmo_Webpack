let request = function() {

    var update_photo_comments_profile_picture = (url, acc) => {

        let changes = { profile_picture_link: url };
        let credential = { email: acc.email };

        let query = this.generate_update_query("Photo_Comments", changes, credential);

        this.sql.query(query, (err, result) => {

            if (err) {
                console.log(err.sqlMessage);
            }

        });
    };
    
    this.req = async (req, res) => { 
        
        let { src_path, account_details } = req.body;
        
        let path_parts = src_path.split('/');
        
        let dest_src = `${path_parts[0]}/${path_parts[1]}/${path_parts[2]}/${path_parts[3]}`;
        
        //Update the sql database
        
        account_details.profile_picture_link = dest_src; 
        
        let query = this.generate_update_query("User_Accounts", 
                                                account_details, 
                                                {"email": account_details.email});
                                        
        this.sql.query(query, (err, result) => {

            if (err) {

                console.log(query, err.sqlMessage);
                res.json({ message: "Error updating profile picture!", acc_info: account_details, status: 0 });

            } else {

                res.json({ message: "Profile picture updated!", acc_info: account_details, status: 0 });

                //Update the profile picture on the Photo_Comments table as well
                update_photo_comments_profile_picture(dest_src, account_details);
            }

            res.end();
        });

    };
};

export default request;

