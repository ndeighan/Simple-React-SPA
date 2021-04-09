import React from 'react';
import '../assets/trueFalse.css';

class CreateTrueFalseQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.State;
        //console.log("state", this.state);
        if(this.state.display === "Create"){
            this.questionModel = JSON.parse(JSON.stringify(this.state.questionTypes));
            this.questionModel = this.questionModel
                .filter(type => type.questionType === "trueFalse");
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
    handleAnswerSelect(event){
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
            <div className="true-false-question">
                {this.cardTitle}TrueFalseQuestion
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
                <div>
                    <p className="is-size-6 has-text-weight-bold">Answer: </p>
                    <form className="true-false-question">
                        <input type="radio" 
                               name="answer" 
                               value="true"
                               checked={this.questionModel[0].answer === "true"}
                                onChange={event => this.handleAnswerSelect(event)} />
                        True
                        <br />
                        <input type="radio" 
                               name="answer" 
                               value="false" 
                               checked={this.questionModel[0].answer === "false"}
                               onChange={event => this.handleAnswerSelect(event)} />
                        False
                        <br />
                    </form>
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

export default CreateTrueFalseQuestion