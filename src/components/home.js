import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currect_answer_counter: 0,
            display_result: false
        }

        this.updateCurrentAnswerCount = this.updateCurrentAnswerCount.bind(this);
    }

    updateCurrentAnswerCount(current_question_index) {
        this.setState({
            currect_answer_counter: this.state.currect_answer_counter + 1,
            display_result: current_question_index === 10 ? true : false
        });
    }

    render() {
        return (
            <div>
                <h1 style={{ marginTop: "20px" }}>Your Quiz</h1>
                <button
                    type="button"
                    className='btn btn-success'
                    style={{ marginTop: "200px", marginLeft: "47%" }}
                >
                    <Link
                        to='quiz/question_id_1'
                        style={{ color: 'white', display: 'block', height: '100%' }}
                    >
                        Start Quiz
                    </Link>
                </button>
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;