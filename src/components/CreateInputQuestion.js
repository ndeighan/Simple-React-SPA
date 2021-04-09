import React from 'react';
import '../assets/input.css';

class CreateInputQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.State;
        //console.log("state", this.state);
        
        if(this.state.display === "Create"){
            this.questionModel = JSON.parse(JSON.stringify(this.state.questionTypes));
            this.questionModel = this.questionModel
                .filter(type => type.questionType === "input");
            this.questionModel[0].questionId = this.state.questionsData.length+1;
            this.cardTitle = "Create ";
        } else if(this.state.display === "Preview"){
            this.questionModel = [];
            var questionIndex = this.state.editSelected-1;
            var questionSelected = this.state.questionsData[questionIndex];
            this.questionModel.push(questionSelected);
            this.cardTitle = "Edit ";
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleQuestionTextInput(event){
        this.questionModel[0].questionText = event.target.value;
        this.setState({});
    }
    handleAnswerTextInput(event){
        this.questionModel[0].answer = event.target.value; 
        this.setState({});
    }
    handleAttemptsInput(event){
        this.questionModel[0].attempts = parseInt(event.target.value);
        this.setState({});
    }
    handleSubmit(event){
        this.questionModel.map(item => { 
            delete item.id; 
            return item; 
        });
        this.props.onClick(this.questionModel);
        event.preventDefault();
    }
    render() {
        return (
            <div className="input-question">
                {this.cardTitle}InputQuestion
                <div>
                    <p><strong>Question ID: </strong>{this.questionModel[0].questionId}</p>
                </div>
                <hr />
                <div>
                    <p><strong>Question Type: </strong>{this.questionModel[0].questionType}</p>
                </div>
                <hr />
                <div className="new-question-text">
                    <p className="is-size-6 has-text-weight-bold">Question text:</p>
                    <br />
                    <textarea type="text" name="questionText" 
                        rows="4" cols="50" placeholder="Insert question." 
                        value={this.questionModel[0].questionText}
                        onChange={event => this.handleQuestionTextInput(event)} />
                </div>
                <hr />
                <div className="new-question-answer">
                    <p className="is-size-6 has-text-weight-bold">Answer text:</p>
                    <br />
                    <textarea type="text" name="questionAnswer" 
                        rows="4" cols="50" placeholder="Insert Answer." 
                        value={this.questionModel[0].answer}
                        onChange={event => this.handleAnswerTextInput(event)} />
                </div>
                <hr />
                <div>
                    <p className="is-size-6 has-text-weight-bold">Attempts:</p>
                    <input type="number" name="attempts" size="50" 
                        value={this.questionModel[0].attempts}
                        onChange={event => this.handleAttemptsInput(event)}/> 
                </div>
                <hr />
                <a href="/#" className="button"
                    ref={btn => { this.btn = btn; }}
                    onClick={this.handleSubmit} >
                    SUBMIT
                </a>
            </div>
        )
    }
}

export default CreateInputQuestion