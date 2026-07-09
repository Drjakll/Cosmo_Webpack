import React, {Component} from 'react';
import Context from '@context/context.js';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import './suggestions.less';

class Suggestions extends Component {

    static contextType = Context;

    static last_user_id = 0;

    constructor(props){

        super(props);   

        let {visitor_user_account} = props;

        this.state = {
            visitor_user_account,
            suggestions: []
        };
    }

    componentWillUnmount(){

        Suggestions.last_user_id = 0;
        
    }

    async componentDidMount(){

        this.setState({suggestions: await this.Get_Mutual_Recommendations()});
    }

    Get_Mutual_Recommendations = async ()=>{

        let {get_mutual_recommendations} = this.context.Request_URLs;

        let {id} = this.state.visitor_user_account;

        let data = await(await fetch(
            `${get_mutual_recommendations}/${id}/${Suggestions.last_user_id}`,
            {
                method: "GET"
            }
        )).json();

        if(!data){
            return;
        }

        Suggestions.last_user_id = data.results.length > 0 ? data.results[data.results.length - 1].id : Suggestions.last_user_id;

        return data.results;

    }

    render(){

        let {suggestions, visitor_user_account} = this.state;

        let has_suggestions = <div id="suggestions-wrapper" className="general-feed">

            <div id="suggestions-header">

                <label>Users you may know</label>

            </div>

            <div id="suggestion-contents">

                {suggestions.map((value, index)=> {

                    let {first_name, last_name} = value;

                    return <div key={value.id} className="profile-suggestion-wrapper">

                        <div id="the-profile-thumbnail">

                            <Profile_Thumbnail  
                                profile={value}
                                owner_user_account={visitor_user_account} 
                                visitor_user_account={visitor_user_account}
                            />

                        </div>

                        <div id="profile-name">

                            <label>{first_name} {last_name}</label>

                        </div>

                    </div>
                })}

            </div>

        </div>;

        let has_no_suggestions = "";

        return suggestions.length ? has_suggestions : has_no_suggestions;
    }
}

export default Suggestions;