import { combineReducers } from 'redux';
import { resourceReducer } from './resource/reducers';
import { bookingReducer } from './booking/reducers';
export const rootReducer = () => combineReducers({
    booking: bookingReducer,
    resources: resourceReducer,
});
//# sourceMappingURL=reducer.js.map