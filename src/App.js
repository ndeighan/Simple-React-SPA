import './assets/bulma.css';

import React from 'react';

import Home from './views/Home';
import Create from './views/Create';
import Preview from './views/Preview';

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            display: 'Home',
            questionsData: [],
            questionTypes: [
                {
                    id: 1,
                    "questionId": 0, //Question id
                    "questionType": "trueFalse", //Question type
                    "questionText": "", //Question text
                    "answer": "true", //"true" or "false"
                    "isCorrect": false,
                    "attempts": 0 //attempts, 0 = infinite
                },
                {
                    id: 2,
                    "questionId": 0,
                    "questionType": "input",
                    "questionText": "",
                    "answer": "",
                    "isCorrect": false,
                    "attempts": 0
                },
                {
                    id: 3,
                    "questionId": 0,
                    "questionType": "mcq",
                    "questionText": "",
                    "multipleAnswer": false,
                    "options": [
                    ],
                    "isCorrect": false,
                    "attempts": 1
                }
            ],
            createSelected: "",
            editSelected: "",
            isComplete: false,
            score: 0
        }
        process.nextTick = setImmediate
    }
    componentDidMount() { 
        Promise.all([ 
        fetch('http://localhost:2020')
            .then(response => response.json())
            .then((json) => { 
                    this.setState({ 
                        questionsData: json.questions 
                    });
                })  
        ])
    }
    changeDisplay = (e) => {
        switch ( e.target.innerHTML ) {
          case "Home":
            this.setState({ display: 'Home' });
            break;
          case "Create":
            this.setState({ display: 'Create' });
            break;
            case "Preview":
            this.setState({ display: 'Preview' });
            break;
          default:
        }
        
    }
    
    renderInner() {
        let { display } = this.state;

        switch ( display ) {
          case "Home":
            return <Home Home={this.state} />
          case "Create":
            return <Create Create={this.state} />
            case "Preview":
            return <Preview Preview={this.state} />
          default:
        }
    }
    
    render(){
        return (
            <div className="App">
                <div className="tabs">
                <ul>
                    <li onClick={this.changeDisplay} className="is-active"><a href="/#">Home</a></li>
                    <li onClick={this.changeDisplay}><a href="/#">Create</a></li>
                    <li onClick={this.changeDisplay}><a href="/#">Preview</a></li>
                </ul>
                </div>
                {this.renderInner()}
            </div>
        )
    }
}

export default App;