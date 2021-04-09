import React from 'react';
import CreateInputQuestion from '../components/CreateInputQuestion';
import CreateMultipleChoiceQuestion from '../components/CreateMultipleChoiceQuestion';
import CreateTrueFalseQuestion from '../components/CreateTrueFalseQuestion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.Create;
        //console.log("Create", this.state);
        this.userInput = "";
        
        this.questionSubmitted = this.questionSubmitted.bind(this);
    }
    inputHandler(event){
        this.userInput = event.target.value;
    }
    getQuestion(event){
        this.setState({ 
            selected: this.userInput 
        });
    }
    renderQuestionCreator(){
        switch ( this.state.selected ) {
          case "trueFalse":
            return <CreateTrueFalseQuestion 
                       State={this.state} 
                       onClick={this.questionSubmitted} />
          case "input":
            return <CreateInputQuestion 
                       State={this.state} 
                       onClick={this.questionSubmitted} />
            case "mcq":
            return <CreateMultipleChoiceQuestion 
                       State={this.state} 
                       onClick={this.questionSubmitted} />
          default:
        }
    }
    questionSubmitted(value){
        var questionsData = this.state.questionsData;
        questionsData.push(value[0]);
        
        this.setState({ questionsData: questionsData });
        this.setState({ selected: "" }, () => {
            this.postData();
        });
    }
    postData(){
        var questionData = {questions: this.state.questionsData};
        
        Promise.all([ 
             axios
                .post('http://localhost:2020', questionData)
                .then((json) => { 
                        toast.success("Created successfully.");
                    })
                .catch(error => {
                    console.error('There was an error bob!', error);
                    toast.error("Error.");
                })
        ])
    }
    renderOptions(){
        return this.state.questionTypes.map((type, index) => {
            return(
                <option key={type.id} value={type.questionType}>
                    {type.questionType}
                </option> 
            )
        })
    }
    render() {
        return (
            <div>
                <header className="hero is-primary">
                    <div className="hero-body">
                        <p className="title">
                            Create title
                        </p>
                        <p className="subtitle">
                            Create subtitle
                        </p>
                    </div>
                </header>
                <div className="container">
                    <div className="select-question container">
                        <p className="is-size-6 has-text-weight-bold">Create</p>
                        <p>Chose component:</p>
                        <select className="comments-select-user" 
                            onChange={event => this.inputHandler(event)}>
                            <option value="">Please select a question type</option>
                            {this.renderOptions()}
                        </select>
                        <button className="button" 
                            onClick={event => this.getQuestion(event)}>Add</button>
                    </div>
                    {this.renderQuestionCreator()}
                </div>
                <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    autoClose={false}
                    newestOnTop={true}
                    closeOnClick={false}
                    draggable={false}
                    rtl={false}
                  />
            </div>
        )
    }
}

export default Create;