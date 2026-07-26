import React from 'react';
import Profile_Info from '@profile_info';
import './profile_info_public.less';

class Profile_Info_Public extends Profile_Info {

    constructor(props){

        super(props);
        
    }

    render(){

        return <div id="profile-info-public-wrapper">

            {super.render()}

        </div>
    }
}

export default Profile_Info_Public;