import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getQuizQuestions } from '../actions/index';

/**
 * This component displays the Question title, question itself, 
 * available options and skip button to go to next question 
 */
class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            all_question_keys: [],
            quizData: {},
            current_question_id: 'question_id_1',
            current_question: {},
            current_question_index: 0
        };

        this.onOptionClick = this.onOptionClick.bind(this);
    }

    //On click of the option,
    //if the answer is correct invoke the callback function passed
    //from App component to increase the couter of correctly answered questions
    //and set the next question in the state else directly set the state
    onOptionClick(event) {

        if (event.target.id === this.state.current_question.answer_id) {
            this.props.onOptionClick(this.state.current_question_index);
        }

        this.setState({
            current_question_id: this.state.all_question_keys[this.state.current_question_index + 1],
            current_question: this.state.quizData[this.state.all_question_keys[this.state.current_question_index + 1]],
            current_question_index: this.state.current_question_index + 1
        })
    }

    //Get the quiz data by calling action
    //which internally makes API request and gets the quiz data
    componentWillMount() {
        this.props.getQuizQuestions();
    }

    //After getting the quiz data,on changing of URL
    //or on refresh of the page, set the data in the state appropriately
    componentWillReceiveProps(nextProps) {
        let current_question_id = nextProps.match.params.id;
        let currQuestionIdArray = current_question_id.split('_');
        let current_question_index = Number(currQuestionIdArray[currQuestionIdArray.length - 1]) - 1;

        this.setState({
            all_question_keys: Object.keys(nextProps.quizData),
            quizData: nextProps.quizData,
            current_question_id,
            current_question: nextProps.quizData[current_question_id],
            current_question_index
        })
    }

    render() {

        const nextLink = this.state.current_question_index === this.state.all_question_keys.length - 1 ?
            `result`
            :
            `${this.state.all_question_keys[this.state.current_question_index + 1]}`;

        return (
            <div>
                <h1 style={{ marginTop: "20px" }}>Your Quiz</h1>
                <div className='quizDiv'>
                    {
                        JSON.stringify(this.state.quizData) !== '{}' ?
                            (
                                <div>
                                    <h4 style={{ marginTop: '40px', marginLeft: '40px' }}>
                                        {this.state.current_question.title}
                                    </h4>
                                    <h6 style={{ marginTop: '20px', marginLeft: '60px' }}>
                                        {this.state.current_question.text}
                                    </h6>

                                    {
                                        this.state.quizData[this.state.current_question_id].options.map((option, index) =>
                                            <div
                                                id={option.id}
                                                key={option.id}
                                                style={{
                                                    marginTop: index === 0 ? '20px' : '0px',
                                                    marginLeft: '60px',
                                                    border: '1px solid grey',
                                                    width: '220px',
                                                    height: '40px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={e => this.onOptionClick(e)}
                                            >
                                                <Link
                                                    id={option.id}
                                                    to={nextLink}
                                                    style={{ color: 'black', display: 'block', height: '100%' }}
                                                >
                                                    {`${index + 1}. ` + option.text}
                                                </Link>
                                            </div>
                                        )
                                    }

                                    <button
                                        type="button"
                                        className='btn btn-primary'
                                        style={{ marginLeft: "580px", marginTop: "130px" }}
                                    >
                                        <Link
                                            to={nextLink}
                                            style={{ color: 'white', display: 'block', height: '100%' }}
                                        >
                                            Skip
                                    </Link>
                                    </button>
                                </div>
                            )
                            :
                            (
                                <p>Loading your quiz...</p>
                            )
                    }

                </ div>
            </div>
        );
    }
}

Question.propTypes = {

};

function mapStateToProps(state) {
    return {
        quizData: state.quizData
    }
}

export default connect(mapStateToProps, { getQuizQuestions })(Question);