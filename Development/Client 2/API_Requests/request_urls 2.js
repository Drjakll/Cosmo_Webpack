let request_urls = async () =>{

    let response = await fetch('request_routes', {
        method: "GET"
    });

    let data = await response.json();

    return data.route_urls;

}

export default await request_urls();