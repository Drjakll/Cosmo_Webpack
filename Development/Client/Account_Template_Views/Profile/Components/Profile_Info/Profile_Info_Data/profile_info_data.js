import React, {Component} from 'react';
import First_Name from './Profile_Info_Types/first_name.js';
import Last_Name from './Profile_Info_Types/last_name.js';
import Birth_Date from './Profile_Info_Types/birth_date.js';
import Birth_Location from './Profile_Info_Types/birth_location.js';
import Current_Location from './Profile_Info_Types/current_location.js';
import Gender from './Profile_Info_Types/gender.js';
import Hobbies from './Profile_Info_Types/hobbies.js';
import Martial_Status from './Profile_Info_Types/martial_status.js';
import Professions from './Profile_Info_Types/professions.js';
import School from './Profile_Info_Types/school.js';
import './profile_info_data.less';

class Profile_Info_Data extends Component {
    
    Info_Templates = [
        {component: First_Name},
        {component: Last_Name},
        {component: Birth_Date},
        {component: Birth_Location},
        {component: Current_Location},
        {component: Gender},
        {component: Hobbies},
        {component: Martial_Status},
        {component: Professions},
        {component: School}
    ];
    
    state = {
        account_data: {}
    };
    
    constructor(props){
        
        super(props);

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        this.setState(this.state);
    }
    
    render(){
        
        return (
                <div id="profile-info-data">
        
                    <div id="profile-data-label-wrapper">
                    
                        <label>
                            Account Details
                        </label>
                    
                    </div>
                    
                    <div id="info-wrapper">
                    
                        {this.Info_Templates.map((value, index)=>{

                            const Com = value.component;

                            return <div className="individual-info-wrapper">

                                <Com account_data={this.state.account_data} key={index} />

                            </div>;

                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Info_Data;