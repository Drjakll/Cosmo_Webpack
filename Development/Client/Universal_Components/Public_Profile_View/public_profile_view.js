import React, {Component} from 'react';
import Layer_1_Public from './Layer_1_Public/layer_1_public.js';
import Layer_2_Public from './Layer_2_Public/layer_2_public.js';
import Layer_3_Public from './Layer_3_Public/layer_3_public.js';
import Profile_Template from '@profile_template';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import './public_profile_view.less';

class Public_Profile_View extends Profile_Template {

    constructor(props){

        super(props);

        let {render_list} = this.state;

        render_list["Layer_1"].component = Layer_1_Public;
        render_list["Layer_2"].component = Layer_2_Public;
        render_list["Layer_3"].component = Layer_3_Public;

        this.state.view_blocked = true;

    }

    async componentDidMount(){

        let view_blocked = await this.Is_Visitor_Blocked();

        this.setState({view_blocked});
    }

    Is_Visitor_Blocked = async ()=>{

        let {owner_user_account, visitor_user_account} = this.props;

        let {id: viewer_id} =  visitor_user_account;
        let {id: target_id} = owner_user_account;

        let {is_user_blocked} = Request_URLs;

        let body = {
            viewer_id,
            target_id
        };

        let data = await(await fetch(is_user_blocked, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        })).json();

        if(data?.blocked === true){
            await popup_message("message", data.message);
            return true;
        }

        return false;

    }

    render(){

        let {view_blocked} = this.state;

        return <div id="public-profile-view-wrapper">

            {view_blocked === true ? "" : super.render()}

        </div>;
    }
}

export default Public_Profile_View;