import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TimerReducer from "./reducers/TimerReducer";
import ScoreReducer from "./reducers/ScoreReducer";

const rootReducer = combineReducers({
  timer: TimerReducer,
  score: ScoreReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
// persistor.purge()
