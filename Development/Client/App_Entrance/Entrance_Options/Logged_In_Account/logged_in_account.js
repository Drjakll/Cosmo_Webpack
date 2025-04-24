import React, {Component} from 'react';
import Screen from './Screen/screen.js';
import './logged_in_account.less';


class Logged_In_Account extends Component {
    
    Button_Data = [
        "Profile",
        "Connections",
        "News",
        "Explore"
    ];
    
    constructor(props){
        
        super(props);
        
            //Divided into 3 screen columns
        this.state = {
            Columns : [
                {screen: "Explore", is_main: false},
                {screen: "Profile", is_main: true},
                {screen: "Connections", is_main: false}
            ],
            account_data: this.props.account_data
        };
    }
    
    //This function is to change the main screen. Also changes the left and right screen.
    RotateScreen = (focus)=>{
        
        let leftScreen = (focus - 1) % 4;
        leftScreen = leftScreen < 0 ? leftScreen + 4 : leftScreen;
        
        let rightScreen = (focus + 1) % 4;
        
        this.setState({
            Columns : [
                {screen: this.Button_Data[leftScreen], is_main: false},
                {screen: this.Button_Data[focus], is_main: true},
                {screen: this.Button_Data[rightScreen], is_main: false}
            ]
        });
        
    }
    
    render(){
        
        let main_options = <div id="logged-in-option-buttons">
                
                                {this.Button_Data.map((value, index)=>{

                                    return <div className="logged-in-option-button" 
                                                key={index} 
                                                onClick={(e)=>{
                                                    this.RotateScreen(index);
                                                }}>

                                        {value}

                                    </div>;

                                })}

                            </div>;
        
        return (
                <div id="logged-in-account">
                    
                    <div id="logged-in-columns-wrapper">
                    
                        {this.state.Columns.map((info, index)=>{
                            
                            return <div className={`logged-in-column ${info.is_main ? "main" : ""}`} key={index}>
                                        
                                        <div className="screen-wrapper">
                                            
                                            <Screen screen_type={info.screen}/>
                                            
                                        </div>

                                        {info.is_main ? main_options : <></>}

                                    </div>;

                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Logged_In_Account;