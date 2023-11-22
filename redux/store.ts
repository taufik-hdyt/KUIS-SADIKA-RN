import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserProfile from "./reducers/TimerReducer";

const rootReducer = combineReducers({
  user: UserProfile,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
// persistor.purge()
