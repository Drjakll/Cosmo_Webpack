import React from 'react';
import Profile_Template from '@profile_template';
import Layer_1_Private from './Layer_1_Private/layer_1_private.js';
import Layer_2_Private from './Layer_2_Private/layer_2_private.js';
import Layer_3_Private from './Layer_3_Private/layer_3_private.js';
import './profile_private.less';


class Profile extends Profile_Template {
    
    constructor(props){
        
        super(props);
        
        let {render_list} = this.state;

        render_list["Layer_1"].component = Layer_1_Private;
        render_list["Layer_2"].component = Layer_2_Private;
        render_list["Layer_3"].component = Layer_3_Private;

    }
    
    render(){
        
        return (
            <div id="profile-private">

                {super.render()}

            </div>
        );
    }
}

export default Profile;