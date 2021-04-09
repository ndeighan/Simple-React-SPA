import React from 'react';
import '../assets/question.css';
import '../assets/input.css';

class InputQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.Question;
        //console.log("InputQuestion", this.state)
        
        this.userInput = ""
        this.attempts = 0;
        this.markQuestion = "";
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    inputHandler(e){
        this.userInput = e.target.value;
    }
    handleSubmit(event){
        if(this.state.attempts === 0){
            this.processSubmission();
        } else if(this.attempts < this.state.attempts){
            this.attempts++;
            if(this.attempts === this.state.attempts){
                this.btn.setAttribute("disabled", "disabled");  
            }
            this.processSubmission();
        }
        event.preventDefault();
    }
    processSubmission(){
        if(this.userInput === this.state.answer){
            this.btn.setAttribute("disabled", "disabled");
            this.markQuestion = "is-success";
            this.setState({ isCorrect: true }, () => {
                this.reportAnswer();
            });
        } else {
            this.markQuestion = "is-danger";
            this.setState({ isCorrect: false }, () => {
                this.reportAnswer();
            });
        }
    }
    reportAnswer(){
        this.props.onClick(this.state);        
    }
    render() {
        return (
            <div className="input-question" key={this.state.questionId}>
                <div className="question-content">
                    <p className={`${this.markQuestion.length > 0 ? this.markQuestion : ''} is-size-5 has-text-weight-bold`}>
                        { this.state.questionText }
                    </p>
                    <form className="input-question-form" 
                        onChange={event => this.inputHandler(event)}>
                        <input className="input" 
                               type="text" 
                               name="answer" 
                               placeholder="Enter answer"
                            />
                        
                        <a href="/#" className="button"
                            ref={btn => { this.btn = btn; }}
                            onClick={event => this.handleSubmit(event)} >
                            SUBMIT
                        </a>
                    </form>
                </div>
            </div>
        )
    }
}

export default InputQuestion;