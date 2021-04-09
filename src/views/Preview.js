import React from 'react';
import InputQuestion from '../components/InputQuestion';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import TrueFalseQuestion from '../components/TrueFalseQuestion';
import CreateInputQuestion from '../components/CreateInputQuestion';
import CreateMultipleChoiceQuestion from '../components/CreateMultipleChoiceQuestion';
import CreateTrueFalseQuestion from '../components/CreateTrueFalseQuestion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../assets/preview.css';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.Preview;
        //console.log("state", this.state);
        
        this.submittedAnswers = [];
        this.tally = 0;
        this.selectedQuestion = [{questionType: ""}];
        this.answerSubmitted = this.answerSubmitted.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.editSubmitted = this.editSubmitted.bind(this);
    }
    
    removeQuestion(event){
        var res = window.confirm("Are you sure you want to delete?");
        
        if (res === true) {
            var newQuestions = JSON.parse(JSON.stringify(this.state.questionsData));
            const amendedQuestions = newQuestions.filter(question => question.questionId !== parseInt(event.target.id));
            //Update state
            this.setState({ questionsData: amendedQuestions }, () => {
                //Reset questionIds
                for(var i = 0; i < amendedQuestions.length; i++){
                    amendedQuestions[i].questionId = i+1;
                }
                this.setState({ questionsData: amendedQuestions }, () => {
                    this.postData("remove");
                });
            });
            
        }
    }
    editQuestion(event){
        this.selectedQuestion = [{questionType: ""}];
        const questionToEdit = parseInt(event.target.id);
        this.selectedQuestion = this.state.questionsData.filter(
                                question => question.questionId === questionToEdit);
        //refresh view after adding new answer.
        this.setState({
            editSelected: event.target.id
        });
    }
    answerSubmitted(value){
        if(!this.submittedAnswers.includes(value)){
            this.submittedAnswers.push(value);
        }
        
        this.totalQuestions = this.state.questionsData.length;
        if(this.submittedAnswers.length === this.totalQuestions){
            for(var i = 0; i < this.totalQuestions; i++){
               if(this.submittedAnswers[i].isCorrect){
                   this.tally++;
               }
            }
            this.setState({ 
                score: this.tally,
                isComplete: true
            });
        }
        
    }
    editSubmitted(value){
        this.selectedQuestion = [{questionType: ""}];
        this.setState({}, () => {
            this.postData("edit");
        });
    }
    postData(value){
        var questionData = {questions: this.state.questionsData};
        
        Promise.all([ 
             axios
                .post('http://localhost:2020', questionData)
                .then((json) => { 
                        if(value === "remove"){
                            toast.success("Removed successfully.");
                        } else if(value === "edit"){
                            toast.success("Edited successfully.");
                        }
                    })
                .catch(error => {
                    console.error('There was an error bob!', error);
                    toast.error("Error.");
                })
        ])
    }
    renderQuestion(){
        if(this.state.questionsData.length > 0){ 
            return this.state.questionsData.map((question, index) => {
                if(question.questionType === "trueFalse"){
                    return <div key={question.questionId}>
                        <div className="question-type">
                            <TrueFalseQuestion 
                                   Question={question} 
                                   onClick={this.answerSubmitted} />
                            <div className="remove-question">
                                <button className="remove-question-button button" 
                                        id={question.questionId}
                                        onClick={this.removeQuestion}>Remove Question</button>
                                <button className="edit-question-button button" 
                                        id={question.questionId}
                                        onClick={this.editQuestion}>Edit Question</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                } else if(question.questionType === "input"){
                    return <div key={question.questionId}>
                        <div className="question-type">
                            <InputQuestion 
                                   Question={question}
                                   onClick={this.answerSubmitted} 
                                   key={question.questionId}/>
                            <div className="remove-question">
                                <button className="remove-question-button button" 
                                        id={question.questionId}
                                        onClick={this.removeQuestion}>Remove Question</button>
                                <button className="edit-question-button button" 
                                        id={question.questionId}
                                        onClick={this.editQuestion}>Edit Question</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                } else if(question.questionType === "mcq"){
                    return <div key={question.questionId}>
                        <div className="question-type"> 
                            <MultipleChoiceQuestion 
                               Question={question}
                               onClick={this.answerSubmitted} />
                            <div className="remove-question">
                                <button className="remove-question-button button" 
                                        id={question.questionId}
                                        onClick={this.removeQuestion}>Remove Question</button>
                                <button className="edit-question-button button" 
                                        id={question.questionId}
                                        onClick={this.editQuestion}>Edit Question</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                }
            });
        }
    }
    renderEdit(){
        if(this.selectedQuestion[0].questionType.length > 0){
            switch ( this.selectedQuestion[0].questionType ) {
              case "trueFalse":
                return (<div className="edit-container">
                            <CreateTrueFalseQuestion 
                                   State={this.state} 
                                   onClick={this.editSubmitted} />
                        </div>)
              case "input":
                return (<div className="edit-container">
                            <CreateInputQuestion 
                                   State={this.state} 
                                   onClick={this.editSubmitted} />
                        </div>)
                case "mcq":
                return (<div className="edit-container">
                            <CreateMultipleChoiceQuestion 
                                   State={this.state} 
                                   onClick={this.editSubmitted} />
                        </div>)
              default:
            }
        }

    }
    renderScore(){
        if(this.state.isComplete){
            return (
                <div className="score">
                    <div className="display-score">
                        <p className="score-title is-size-5 has-text-weight-bold">
                            {this.state.score} out of {this.totalQuestions} 
                        </p>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <header className="hero is-primary">
                    <div className="hero-body">
                        <p className="title">
                            Preview title
                        </p>
                        <p className="subtitle">
                            Preview subtitle
                        </p>
                    </div>
                </header>
                
                <div className="container">
                    {this.renderQuestion()}
                </div>
                {this.renderEdit()}
                {this.renderScore()}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={true}
                    draggable={false}
                    rtl={false}
                  />
            </div>
        )
    }
}

export default Preview;