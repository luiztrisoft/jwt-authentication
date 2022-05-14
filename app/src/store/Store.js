/**
 * 
 * NOTA PARA MIM: É necessário o applyMiddleware e o thunk para evitar o erro 
 * "Actions must be plain objects. Use custom middleware for async actions."
 * Isso ocorre ao fazer certas buscas com async await
 * Para instalar o thunk: npm install --save redux-thunk
 */
import thunk from 'redux-thunk' 
import {combineReducers, applyMiddleware, createStore} from 'redux';

import { GlobalReducer } from './reducers/GlobalReducer';
import { DashboardReducer } from './reducers/DashboardReducer';
import { LoadReducer } from './reducers/LoadReducer';

/**
* Todos os reducers devem ser adicionados.
*/
export const Reducers = combineReducers ({
    globalReducer: GlobalReducer,
    dashboardReducer: DashboardReducer,
    loadReducer: LoadReducer
});

export const Store = createStore(Reducers, applyMiddleware(thunk));