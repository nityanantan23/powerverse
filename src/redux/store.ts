import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import {useDispatch} from 'react-redux';

const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pokeReducer'],
  blacklist: ['singlePokeReducer'],
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
