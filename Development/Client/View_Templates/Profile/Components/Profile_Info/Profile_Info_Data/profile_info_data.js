import React, {Component, createRef} from 'react';
import Context from '@context/context.js';
import Account_Data_Templates from '@data_templates/account_data.js';
import './profile_info_data.less';

let {Mood_Options} = Account_Data_Templates;

class Profile_Info_Data extends Component {

    constructor(props) {

        super(props);

        Profile_Info_Data.contextType = Context;

        let {owner_user_account, visitor_user_account} = this.props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            info_templates: {}
        };
    }

    async componentDidMount(){

        //Account_Info_Data_Template is located at the Data_Templates folder
        let {Account_Info_Data_Template} = this.context.Account_Data_Templates;

        let info_templates = await Account_Info_Data_Template();

        this.setState({info_templates});
        
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
        
    }

    Update_Value = null;

    Create_Mood_Selections = null;
    
    Get_Mood = ()=>{

        let {owner_user_account} = this.state;
        let {last_mood_updated, mood_today} = owner_user_account;

        last_mood_updated = last_mood_updated?.split("T")[0];

        let utc_today = new Date().toISOString().split("T")[0];

        if(!last_mood_updated || utc_today !== last_mood_updated){
            return <div id="current-mood"><img src={`./static/dunno.webp`}/> No Update </div>;
        }

        return <div id="current-mood"><img src={`./static/${Mood_Options[mood_today]}`}/> {mood_today}</div>;

    }

    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let infoWrapperRef = createRef();
        
        let { change_main_display } = this.props;

        let {owner_user_account, visitor_user_account, info_templates} = this.state;
        
        return (
            <div id="profile-info-data">

                <div id="profile-data-label-wrapper">

                    <div id="today-mood-wrapper">

                        <div id="mood-label">

                            Mood Today

                        </div>

                        <div id="the-mood" className={this.Create_Mood_Selections && "mood-selectable"}>

                            {this.Get_Mood()}

                            {this.Create_Mood_Selections && <div id="mood-selection-wrapper">{this.Create_Mood_Selections()}</div>}

                        </div>

                    </div>

                    <div id="detail-label">

                        <img src={'./static/personal_details_icon.webp'}/>

                        <label>Details</label>

                    </div>

                </div>
                
                <div id="info-wrapper"

                    ref={infoWrapperRef}

                    onMouseDown={(e) => {
                        drag_scroll.init_drag(e, infoWrapperRef.current);
                    }}

                    onMouseLeave={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}

                    onMouseUp={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}

                    onMouseMove={(e) => {
                        drag_scroll.move_drag(e, infoWrapperRef.current);
                    }}
                >

                    {Object.keys(info_templates).map((key, index) => {

                        const template = info_templates[key];

                        const Com = template.component;
                        let value = owner_user_account[key];
                        let { label, options, background, label_icon } = template;

                        return <div className="individual-info-wrapper" key={index}>

                            <div id="info-label">

                                <div id="label-icon" style={{backgroundImage: `url(./static/${label_icon})`}}></div> 
                                
                                <label>{label}</label> 

                            </div>

                            <div id="info-value">

                                <Com 
                                    value={value}
                                    label={label}
                                    column_name={key}
                                    update_callback={this.Update_Value}
                                    owner_user_account={owner_user_account}
                                    visitor_user_account={visitor_user_account}
                                    options={options}
                                    change_main_display={change_main_display}
                                    background={background}
                                />

                            </div>

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Profile_Info_Data;