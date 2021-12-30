import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/app/App';
import { HashRouter } from 'react-router-dom'
import { Store } from './store/Store';
import { Provider as ReduxProvider } from 'react-redux';
import ScrollToTop from './config/ScrollToTop';

ReactDOM.render(
    <ReduxProvider store={Store}>
        <HashRouter>
            <ScrollToTop>
                <App></App>
            </ScrollToTop>
        </HashRouter>
    </ReduxProvider>,
    document.getElementById('root')
);
