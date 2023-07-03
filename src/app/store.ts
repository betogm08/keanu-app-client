import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import keanuReducer from '../features/keanu/keanuSlice';
import keanuSaga from '../sagas/keanuSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        keanu: keanuReducer
    },
    middleware: [saga]
});

saga.run(keanuSaga);
