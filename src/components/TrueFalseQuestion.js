import React from 'react';
import '../assets/question.css';
import '../assets/trueFalse.css';

class TrueFalseQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.Question;
        //console.log("TrueFalseQuestion", this.state)
        
        this.selected = "";
        this.attempts = 0;
        this.markQuestion = "";
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSelect(e){
        this.selected = e.target.value;
    }
    processSubmission(){
        if(this.selected === this.state.answer){
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
           <div className="true-false-question">
                <div className="question-content">
                    <p className={`${this.markQuestion.length > 0 ? this.markQuestion : ''} is-size-5 has-text-weight-bold`}>
                        { this.state.questionText }
                    </p>
                    <form className="true-false-question"
                        onChange={event => this.handleSelect(event)}>

                        <input type="radio" 
                               name="answer" 
                               value="true" />
                        True
                        <br />
                        <input type="radio" 
                               name="answer" 
                               value="false"  />
                        False
                        <br />
                        <a href="/#" className="button"
                            ref={btn => { this.btn = btn; }}
                            onClick={this.handleSubmit} >
                            SUBMIT
                        </a>
                    </form>
                </div>
            </div>
        )
    }
}

export default TrueFalseQuestion;
