let generate_time_string = (a_date)=>{
   
    let isoStr = a_date.toISOString();
    
    let parts = isoStr.split("T");
    
    let date = parts[0];
    
    let hrs= parts[1].split(".")[0];
    
    let timeStr = `${date} ${hrs}`;
    
    return timeStr;
    
};

export default generate_time_string;

