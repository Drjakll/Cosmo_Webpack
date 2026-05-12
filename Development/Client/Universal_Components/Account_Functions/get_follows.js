import Request_URLs from '@root/API_Requests/request_urls.js';

//A hold of all the function pointers that will be used to update their component after the follow/unfollow action is made
let set_state_ptrs = {
    get_followers: {},
    get_followings: {}
};

let visiting_set_state_ptrs = {
    get_followers: {},
    get_followings: {}
}

let account_data = null;

let visiting_account_data = null;

let Queue_Set_State = (setState, user_account, slot, component_label, is_visiting = false) => {

    if(!is_visiting){

        set_state_ptrs[slot][component_label] = setState;

        account_data = user_account;

    } else {

        visiting_set_state_ptrs[slot][component_label] = setState;

        visiting_account_data = user_account;

    }
};

let Refresh = async (refresh_followers = true, is_visiting = false) => {

    let {get_followers, get_followings} = (is_visiting ? visiting_set_state_ptrs : set_state_ptrs);

    let account = is_visiting ? visiting_account_data : account_data

    let list = await Get_Follows(account, refresh_followers);

    if(refresh_followers) {

        for(let comp_label in get_followers){

            let setState = get_followers[comp_label];

            setState && setState({
                followers: list
            });

        }

    } else {

        for(let comp_label in get_followings){

            let setState = get_followings[comp_label];

            setState && setState({
                followings: list
            });

        }
    }
};

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

};

export {Queue_Set_State, Refresh, Get_Follows};