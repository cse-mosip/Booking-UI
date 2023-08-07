import { combineReducers, Reducer } from 'redux';
import { resourceReducer } from './resource/reducers';
import { ResourcesState } from './resource/types';
import { bookingReducer } from './booking/reducers';
import { BookingState } from './booking/types';
import { userReducer } from './user/reducers';
import { UserState } from './user/types';

export const rootReducer = (): Reducer =>
    combineReducers<AppState>({
        booking: bookingReducer,
        resources: resourceReducer,
        user: userReducer,
});

export type AppState = {
    booking: BookingState;
    resources: ResourcesState;
    user: UserState;
}
