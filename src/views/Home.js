import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Home", this.props.Home)
    }
    render() {
        return (
            <div>
                <header className="hero is-primary">
                    <div className="hero-body">
                        <p className="title">
                            Home title
                        </p>
                        <p className="subtitle">
                            Home subtitle
                        </p>
                    </div>
                </header>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default Home;