import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import Home from './components/home';
import Question from './components/question';
import Result from './components/result';

// import store from './store';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currect_answer_counter: 0
    }

    //Bind the functions with correct scope
    this.updateCorrectAnswerCount = this.updateCorrectAnswerCount.bind(this);
    this.resetCorrectAnswerCount = this.resetCorrectAnswerCount.bind(this);
  }

  //On choosing of the correct option, this function will
  //be invoked
  updateCorrectAnswerCount(current_question_index) {
    this.setState({
      currect_answer_counter: this.state.currect_answer_counter + 1
    });
  }

  //On going back to start quiz,
  //this function will be invoked
  resetCorrectAnswerCount() {
    this.setState({
      currect_answer_counter: 0
    });
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/quiz/result" render={routeProps => (<Result onBackToQuizClick={this.resetCorrectAnswerCount} totalCurrectAnswer={this.state.currect_answer_counter} />)} />
              <Route path="/quiz/:id" render={routeProps => (<Question onOptionClick={this.updateCorrectAnswerCount} {...routeProps} />)} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
