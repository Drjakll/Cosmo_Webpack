import Request_URLs from '@root/API_Requests/request_urls.js';

let Get_Follows = async (account, get_followers = true)=>{

    let {get_all_followers, get_all_followings} = Request_URLs;

    let url = get_followers ? get_all_followers : get_all_followings;

    let {id} = account;

    let data = await(await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).json();

    return data?.results ?? [];

}

export default Get_Follows;