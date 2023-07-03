import { call, put, takeEvery } from 'redux-saga/effects';
import { getKeanuImageSuccess, getKeanuImageFailure } from '../features/keanu/keanuSlice';
import { Action, KeanuImageResponse } from '../types';

function* workGetKeanuImageFetch(action: Action) {
    try {
        const { width, height, option } = action.payload;

        const url = 'http://localhost:4000/';

        const query = `
            query { 
                getKeanuImage(width: ${width}, height: ${height}, option: "${option}") 
            }
        `;

        const options: RequestInit = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({query})
        }

        const response: Response = yield call(() => fetch(url, options));
        const keanuImageResponse: KeanuImageResponse = yield response.json();

        yield put(getKeanuImageSuccess(keanuImageResponse));
    } catch (error) {
        console.log(error)
        yield put(getKeanuImageFailure(error));
    }
    
}

function* keanuSaga() {
    yield takeEvery('keanu/getKeanuImageFetch', workGetKeanuImageFetch);
}

export default keanuSaga;