import fs from 'fs';



function request({sql}) {

    this.req_path = "/demo";
    this.req_type = "get";
    this.callbacks = ["demo"];

    
    this.req = (req, res) => {
        
        try {
            
            const entry_page = fs.readFileSync(`${__dirname}/Demo/demo.html`, 'utf8');
            
            res.send(entry_page);
            
        }
        catch(err){
            
            console.log(err);
        }
        
        res.end();
    };
};

export default request;