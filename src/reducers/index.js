import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';

import QuizReducer from "./reducer_quiz";

const rootReducer = combineReducers({
    quizData: QuizReducer,
    routing: routerReducer,
});

export default rootReducer;
