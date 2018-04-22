import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * This component is to display the result of the quiz
 * after completion of 10th question
 * It puts one button to take user back to starting of the quiz
 */
class Result extends Component {
    render() {
        return (
            <div>
                <h1 style={{ marginTop: "20px" }}>Result</h1>
                <div className='quizDiv'>
                    <h5 style={{ marginTop: '200px', marginLeft: '20px' }}>
                        {
                            `You have answered ${this.props.totalCurrectAnswer} 
                                ${this.props.totalCurrectAnswer > 1 ? 'questions' : 'question'} correctly...`
                        }
                    </h5>
                    <button
                        type="button"
                        className='btn btn-primary'
                        style={{ marginLeft: "530px", marginTop: "180px" }}
                        onClick={this.props.onBackToQuizClick}
                    >
                        <Link
                            to={'/quiz'}
                            style={{ color: 'white', display: 'block', height: '100%' }}
                        >
                            Back To Quiz
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}

Result.propTypes = {

};

export default Result;