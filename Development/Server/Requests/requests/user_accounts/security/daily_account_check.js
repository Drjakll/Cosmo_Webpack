
//This object is to check whether there are any unverified accounts
//If any unverified accounts older than X days, it will get deleted from the database and their photos will be deleted from S3
function request (sql, s3, PutObjectCommand, DeleteObjectsCommand) {

    this.req_path = '/daily_account_check';
    this.req_type = 'post';
    this.callbacks = ['daily_account_check'];

    this.req = async (req, res) => {

        res.send("This request does nothing");
    };

    let get_accounts = async (x_days) => {

        let query = `
            select 
                * 
            from 
                User_Accounts 
            where 
                created_on <= (unix_timestamp(now() - interval ${x_days} day) * 1000)
            and
                email_verified = 0
            ;
        `;

        try {

            let [results] = await sql.query(query);

            return results;

        } catch(err){

            console.log(err);

            return [];
        }

    };

    let get_photo_links = async (user_ids) => {

        let query = `
            select 
                * 
            from 
                Photo_Links 
            where 
                user_id in (?)
            ;
        `;

        try {

            let [results] = await sql.query(query, [user_ids]);

            return results;

        } catch(err){

            console.log(err);

            return [];
        }   

    };

    let erase_photo_files = async (photo_data) => {

        const max_size = 1000; // Maximum number of objects to delete in a single request

        for (let i = 0; i < photo_data.length; i += max_size) {
            const chunk = photo_data.slice(i, i + max_size);

            const deleteParams = {
                Bucket: process.env.BUCKET_NAME,
                Delete: {
                    Objects: chunk.map(photo => ({ Key: photo.link })),
                    Quiet: false
                }
            };

            try {

                await s3.send(new DeleteObjectsCommand(deleteParams));

            } catch (err) {

                console.log("Error deleting photo files from S3:", err);

            }
        }

    };

    let erase_accounts = async (accs) => {

        let user_ids = accs.map(acc => acc.id);

        let query = `
            delete from 
                User_Accounts 
            where 
                id in (?)
            ;
        `;

        try {

            await sql.query(query, [user_ids]);

        } catch(err){

            console.log(err);

        }   

    };

    //Main function to erase unverified accounts that are older than X days
    this.erase_unverified_accounts = async (x_days) => {

        let results = await get_accounts(x_days);

        if(results.length === 0) {
            console.log("No unverified accounts to erase");
            return results;
        }

        let user_ids = results.map(acc => acc.id);

        let photo_data = await get_photo_links(user_ids);

        //Erase the photo files from S3
        await erase_photo_files(photo_data);

        //Erase the accounts from the database
        await erase_accounts(results);

        return results;
    };

}

export default request;