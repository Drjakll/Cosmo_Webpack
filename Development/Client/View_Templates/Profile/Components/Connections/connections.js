import React, {Component} from 'react';
import './connections.less';

class Connections extends Component {

    constructor(props){

        super(props);


        this.state = {};
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    render(){

        return <div id="connections-bar">

            <div id="connection-types">

                <div id="followers-button" className="follow-button">Followers</div>

                <div id="following-button" className="follow-button">Following</div>

            </div>

        </div>;
    }
}

export default Connections;