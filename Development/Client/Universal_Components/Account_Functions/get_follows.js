import Request_URLs from '@request_urls';

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

    let component_key = `${component_label}_${user_account.id}`;

    if(!is_visiting){

        set_state_ptrs[slot][component_key] = {setState, user_account};

        account_data = user_account;

    } else {

        visiting_set_state_ptrs[slot][component_key] = {setState, user_account};

        visiting_account_data = user_account;

    }
};

let Refresh = async (refresh_followers = true, is_visiting = false, target_account = null) => {

    let {get_followers, get_followings} = (is_visiting ? visiting_set_state_ptrs : set_state_ptrs);

    let account = target_account || (is_visiting ? visiting_account_data : account_data);

    if(!account){
        return;
    }

    let list = await Get_Follows(account, refresh_followers);

    if(refresh_followers) {

        for(let comp_label in get_followers){

            let {setState, user_account} = get_followers[comp_label];

            if(user_account.id !== account.id){
                continue;
            }

            setState && setState({
                followers: list
            });

        }

    } else {

        for(let comp_label in get_followings){

            let {setState, user_account} = get_followings[comp_label];

            if(user_account.id !== account.id){
                continue;
            }

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

let Get_Following_Status = async ()=>{

    let {get_all_following_status} = Request_URLs;

    let data = await(await fetch(
        get_all_following_status,
        {
            method: "GET"
        }
    )).json();

    return data?.following_status ?? [];
}

export {Queue_Set_State, Refresh, Get_Follows, Get_Following_Status};
export default {Queue_Set_State, Refresh, Get_Follows, Get_Following_Status};
