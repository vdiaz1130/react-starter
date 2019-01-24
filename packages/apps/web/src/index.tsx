import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { add } from '@gmws/entity';
console.log(add(15, 45, 40));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODO:
// * Move api/src/core/constant | entity app into libs/constant | entity
// * Add react-native (expo) app
// * React Routing for apps/web UI-Router ? https://levelup.gitconnected.com/using-ui-router-with-react-for-better-app-routing-f801e4d6a404
// * React axios
// * React permissions
// * Server graphql REST implementation
