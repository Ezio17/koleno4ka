import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from './store/reducer/root'
import rootSaga from './store/saga/index'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { HashRouter } from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7e57c2'
    },
    secondary: {
      main: '#f5480f',
      dark: '#c23c10',
    },
    grey: {
      main: 'rgb(85, 85, 85)'
    }
  },
});

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </HashRouter >,
  document.getElementById('root')
);

serviceWorker.unregister();
