import React from 'react';
import '../assets/mcq.css';

class CreateMultipleChoiceQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.State;
        //console.log("state", this.state);
        
        if(this.state.display === "Create"){
            this.questionModel = JSON.parse(JSON.stringify(this.state.questionTypes));
            this.questionModel = this.questionModel
                .filter(type => type.questionType === "mcq");
            this.questionModel[0].questionId = this.state.questionsData.length+1;
            
            this.cardTitle = "Create ";
            this.option = {
                "optionId": 0,
                "optionText": "",
                "correct": false
            }
        } else if(this.state.display === "Preview"){
            this.questionModel = [];
            var questionIndex = this.state.editSelected-1;
            var questionSelected = this.state.questionsData[questionIndex];
            this.questionModel.push(questionSelected);
            this.cardTitle = "Edit ";
        }
        
        this.addAnswer = this.addAnswer.bind(this);
        this.removeAnswer = this.removeAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleQuestionTextInput(event){
        this.questionModel[0].questionText = event.target.value;
        this.setState({});
    }
    handleMultiSelect(event){
        if(event.target.value === "true"){
            this.questionModel[0].multipleAnswer = true;
        } else if(event.target.value === "false"){
            this.questionModel[0].multipleAnswer = false;
        } 
        this.setState({});
    }
    addAnswer(){
        //Generate optionId
        this.option.optionId = this.questionModel[0].options.length + 1;
        //clone to new object
        var newOption = JSON.parse(JSON.stringify(this.option));
        //Add new option to question
        this.questionModel[0].options.push(newOption);
        //refresh view after adding new answer.
        this.setState({});
    }
    removeAnswer(event){
        //Return options without the one selected
        const filteredOptions = this.questionModel[0].options
                                    .filter(option => option.optionId !== event.target.id);
        //clone to new object
        const newOptions = JSON.parse(JSON.stringify(filteredOptions))
        //Reset optionIds
        for(var i = 0; i < newOptions.length; i++){
            newOptions[i].optionId = i+1;
        }
        //Copy amended options to question
        this.questionModel[0].options = newOptions;
        //refresh view after removing answer.
        this.setState({});
    }
    handleOptionTextInput(event, optionId){
        this.questionModel[0].options[optionId-1].optionText = event.target.value;
        this.setState({});
    }
    handleOptionCorrectSelect(event, optionId){
        if(event.target.value === "true"){
            this.questionModel[0].options[optionId-1].correct = true;
        } else if(event.target.value === "false"){
            this.questionModel[0].options[optionId-1].correct = false;
        }
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
    renderNewAnswer(){
        if(this.questionModel[0].options.length > 0){
            return this.questionModel[0].options.map((option, index) => {
                return(
                    <div className="add-answer" key={option.optionId}>
                        <div className="new-answer">
                            <div><p><strong>Option Id: </strong>{option.optionId}</p></div>
                            <div className="new-question-title">
                                <p className="option-title is-size-6 has-text-weight-bold">Option text:</p>
                                <div className="remove-answer">
                                    <button className="remove-answer-button button" 
                                            id={option.optionId}
                                            onClick={this.removeAnswer}>Remove Answer</button>
                                </div>
                            </div>
                            <textarea type="text" name="option" 
                                rows="4" cols="50" placeholder="Insert Answer." 
                                value={option.optionText}
                                onChange={event => this.handleOptionTextInput(event, option.optionId)} />
                        </div>
                        
                        <div className="correct-options">
                            <p className="is-size-6 has-text-weight-bold">
                                Correct?
                            </p>
                            <form className="true-false-question">

                                <input type="radio" 
                                       name="answer" 
                                       value="true"
                                       checked={option.correct === true}
                                       onChange={event => this.handleOptionCorrectSelect(event, option.optionId)}/>
                                True
                                <br />
                                <input type="radio" 
                                       name="answer" 
                                       value="false"
                                       checked={option.correct === false}
                                       onChange={event => this.handleOptionCorrectSelect(event, option.optionId)}/>
                                False
                                <br />
                            </form>
                        </div>
                        <hr />
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div className="multiple-choice-question">
                {this.cardTitle}MultipleChoiceQuestion
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
                    <p className="is-size-6 has-text-weight-bold">Multiple Answer?: </p>
                    <form className="true-false-question">

                        <input type="radio" 
                               name="answer" 
                               value="true"
                               checked={this.questionModel[0].multipleAnswer === true}
                               onChange={event => this.handleMultiSelect(event)} />
                        Yes
                        <br />
                        <input type="radio" 
                               name="answer" 
                               value="false"
                               checked={this.questionModel[0].multipleAnswer === false}
                               onChange={event => this.handleMultiSelect(event)} />
                        No
                        <br />
                    </form>
                </div>
                <hr />
                <div className="add-answer">
                    <button className="add-answer-button button" onClick={this.addAnswer}>Add Answer</button>
                </div>
                <hr />
                {this.renderNewAnswer()}
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

export default CreateMultipleChoiceQuestion