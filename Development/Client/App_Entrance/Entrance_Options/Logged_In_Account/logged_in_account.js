import React, {Component} from 'react';
import Screen from './Screen/screen.js';
import Upper_Bar from './Upper_Bar/upper_bar.js';
import Context from '@context/context.js';
import { io } from 'socket.io-client';
import './logged_in_account.less';


class Logged_In_Account extends Component {
    
    Button_Data = [
        {label: "Profile", icon: "profile_button.png"},
        {label: "Livestream", icon: "livestream_button.png"},
        {label: "Feeds", icon: "feeds_button.png"},
        {label: "Chat", icon: "chat_button.png"},
        {label: "Search", icon: "search_button.png"}
    ];

    //Fixed index of screens
    Columns = [
        { screen: "Profile", is_main: false, id: "Profile" },
        { screen: "Livestream", is_main: false, id: "Livestream" },
        { screen: "Feeds", is_main: false, id: "Feeds" },
        { screen: "Messaging", is_main: false, id: "Messaging"},
        { screen: "Search", is_main: false, id: "Search"}
    ];
    
    constructor(props){
        
        super(props);

        window.global_connection_socket = io("/connections");

        Logged_In_Account.contextType = Context;

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            Columns: [ //This Columns will dynamically rearrange by the user
                { screen: "Empty", is_main: false, id: "Empty1" },
                { screen: "Profile", is_main: true, id: "Profile" },
                { screen: "Empty", is_main: false, id: "Empty2" },
            ],
            owner_user_account,
            visitor_user_account,
            focused_column: "Profile" 
        };
    }

    async componentDidMount() {
    

        //Delete the user key from the websocket backend before exiting
        window.addEventListener("beforeunload", (e)=>{

            global_connection_socket.emit("logging_off", {email: this.state.owner_user_account.email});

        });

        global_connection_socket.on("connect", async ()=>{

            //Signal to create the user key at the websocket backend
            global_connection_socket.emit("newly_logged_in", {email: this.state.owner_user_account.email});

        });

        global_connection_socket.on("refresh_account", ({})=>{

            window.LoginAttempt();

        });

        //this.RotateScreen(0);

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }
    
    //This function is to change the main screen. Also changes the left and right screen.
    RotateScreen = async (index) => {

        let { Columns } = this.state;

        let length = this.Button_Data.length;

        for(let i in this.Columns){

            let newIndex = (((parseInt(i) + 1 - index)%length + length)%length);

            Columns[newIndex] = this.Columns[i];
            Columns[newIndex].is_main = false;

        }

        //So that the main menu will display at the middle screen, index = 1 
        Columns[1].is_main = true;


        await this.setState({
            Columns: Columns
        });

        document.querySelector(`#${this.Button_Data[index]}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });

    }

    Change_View = (index)=>{

        let {Columns} = this.state;

        Columns[1].is_main = false;

        Columns[1] = this.Columns[index];

        Columns[1].is_main = true;

        this.setState({Columns});

    }

    Generate_Options = ()=>{

        return <div id="logged-in-option-buttons">

            {this.Button_Data.map((value, index) => {

                let {label, icon} = value;

                return <div className="logged-in-option-button"
                        key={index}
                        onClick={(e) => {
                            //this.RotateScreen(index);
                            this.Change_View(index);
                        }}>


                        <img src={`./static/${icon}`} />

                        <label>{label}</label>

                    </div>;

            })}

        </div>; 
    }

    render(){
        
        let {owner_user_account, visitor_user_account} = this.state;
        
        return (
            <div id="logged-in-account">

                <div id="upper-bar-wrapper">

                    <Upper_Bar 
                        owner_user_account={owner_user_account} 
                        Change_Screen={this.props.Change_Screen}
                    />

                </div>

                <div id="logged-in-columns-wrapper">

                    {this.state.Columns.map((info, index) => {

                        return <div 
                                className={`logged-in-column ${info.is_main ? "main" : ""}`} 
                                id={info.id}
                                key={info.id}  
                            >
                            
                            <div className="screen-wrapper">

                                <Screen 
                                    owner_user_account={owner_user_account} 
                                    visitor_user_account={visitor_user_account}
                                    screen_type={info.screen} 
                                />

                            </div>

                            {info.is_main ? this.Generate_Options() : ""}

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Logged_In_Account;