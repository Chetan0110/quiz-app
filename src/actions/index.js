import axios from 'axios';
import { FETCH_QUIZ_DATA } from '../types';

const url = 'https://s3-ap-southeast-1.amazonaws.com/grow-fit-stage/uploads/quizapp/quiz.json';

export function getQuizQuestions() {
    const request = axios.get(url);
    return {
        type: FETCH_QUIZ_DATA,
        payload: request
    }
}