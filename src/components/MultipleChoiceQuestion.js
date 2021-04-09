import React from 'react';
import '../assets/mcq.css';

class MultipleChoiceQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.Question;
        //console.log("MultipleChoiceQuestion", this.state)
        
        this.userInput = []
        this.attempts = 0;
        this.markQuestion = "";
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSelect(e){
        if(e.target.checked){
            if(this.state.attempts !== 1 && this.state.multipleAnswer === false){
                this.userInput = [];
            }
            this.userInput.push(parseInt(e.target.value));
        } else {
            const index = this.userInput.indexOf(parseInt(e.target.value));
            if (index > -1) {
              this.userInput.splice(index, 1);
            }
        }
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
        let options = this.state.options;
        let correctAnswers = [];
        
        if(this.state.multipleAnswer){
            for(var i=0; i<options.length; i++){
                if(options[i].correct){
                    correctAnswers.push(options[i].optionId)
                }
            }
            this.userInput.sort();
            var correctStatus = this.compareMultipleAnswers(correctAnswers, this.userInput);
            if(correctStatus === true){
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
        } else {
            for(i=0; i < options.length; i++){
                if(this.userInput[0] === options[i].optionId){
                    if(options[i].correct === true){
                        this.btn.setAttribute("disabled", "disabled");
                        this.markQuestion = "is-success"; 
                    } else {
                        this.markQuestion = "is-danger";
                    }
                    this.setState({ isCorrect: options[i].correct }, () => {
                        this.reportAnswer();
                    });
                }
            }
            
        }
    }
    compareMultipleAnswers(a, b){
        return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }
    reportAnswer(){
        this.props.onClick(this.state);        
    }
    renderFormInner(){
        if(this.state.multipleAnswer){
            return (
                <div>
                    multipleAnswer:
                    {this.renderMultipleAnswer()}
                    <br />
                    <a href="/#" className="button"
                        ref={btn => { this.btn = btn; }}
                        onClick={event => this.handleSubmit(event)} >
                        SUBMIT
                    </a>
                </div>
            )
        } else if (!this.state.multipleAnswer){
            return (
                <div>
                    singleAnswer:
                        {this.renderSingleAnswer()}
                    <br />
                    <a href="/#" className="button"
                        ref={btn => { this.btn = btn; }}
                        onClick={event => this.handleSubmit(event)} >
                        SUBMIT
                    </a>
                </div>
            )
        }
        
    }
    renderMultipleAnswer(){
        return this.state.options.map((option, index) => {
            return(
                <div key={option.optionId}>
                    <input type="checkbox" 
                           name="answer" 
                           value={option.optionId} />
                    {option.optionText}
                </div>
            )
        })
    }
    renderSingleAnswer(){
        return this.state.options.map((option, index) => {
            return (
                <div key={option.optionId}>
                    <input type="radio" 
                           name="answer" 
                           value={option.optionId} />
                    {option.optionText}
                </div>
            )
        })
    }
    render() {
        return (
            <div className="multiple-choice-question">
                <div className="question-content">
                    <p className={`${this.markQuestion.length > 0 ? this.markQuestion : ''} is-size-5 has-text-weight-bold`}>
                        { this.state.questionText }
                    </p>
                    <form className="multiple-choice-question-form"
                        onChange={event => this.handleSelect(event)}>
                        {this.renderFormInner()}
                    </form>
                </div>
            </div>
        )
    }
}

export default MultipleChoiceQuestion;