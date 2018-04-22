import { FETCH_QUIZ_DATA } from "../types";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_QUIZ_DATA:
            return action.payload.data;
        default:
            return state;
    }
}
