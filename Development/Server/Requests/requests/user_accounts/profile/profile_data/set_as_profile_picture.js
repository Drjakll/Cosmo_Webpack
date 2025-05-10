let request = function() {
    
    var clone_file = async (copy_src, dest_src, bucket_name) => {

        let input = {
            "Bucket": bucket_name,
            "CopySource": copy_src,
            "Key": dest_src
        };

        await this.s3.copyObject(input).promise();
    };
    
    this.req = async (req, res) => { 
        
        let { src_path, account_details } = req.body;
        
        let path_parts = src_path.split('/');
        
        path_parts[3] = 'main_profile_picture.jpg';
        
        const {BucketName} = this.global_data;
        
        let copy_src = `/${BucketName}/${src_path}`;
        
        let dest_src = `${path_parts[0]}/${path_parts[1]}/${path_parts[2]}/${path_parts[3]}`;
        
        await clone_file(copy_src, dest_src, BucketName);
        
        
        //Update the sql database
        
        account_details.profile_picture_link = dest_src;
        
        let query = this.generate_update_query("User_Accounts", 
                                                account_details, 
                                                {"email": account_details.email});
                                        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                
                console.log(err.sqlMessage);
                res.json({message: "Error updating profile picture!", acc_info: account_details, status: 0});
                    
            } else {
            
                res.json({message: "Profile picture updated!", acc_info: account_details, status: 0});
            }
            res.end();
        });

    };
};

export default request;

