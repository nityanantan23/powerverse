import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IDetailsPokemon} from '../../types/pokeTypes';
import {BASE_URL} from '../../util/constants';

interface IStateSinglePoke {
  isLoading: boolean;
  pokeID: string;
  singlePokemon: IDetailsPokemon;
}

const initial_state: IStateSinglePoke = {
  isLoading: true,
  pokeID: '',
  singlePokemon: {} as IDetailsPokemon,
};

const singlePokeReducer = createSlice({
  name: 'singlePokeReducer',
  initialState: initial_state,
  reducers: {
    setSinglePokemon: (
      state: IStateSinglePoke,
      action: PayloadAction<IDetailsPokemon>,
    ) => {
      state.singlePokemon = action.payload;
    },
    setLoading: (state: IStateSinglePoke, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPokeID: (state: IStateSinglePoke, action: PayloadAction<string>) => {
      state.pokeID = action.payload;
    },
    resetState: (state: IStateSinglePoke) => {
      state.isLoading = true;
      state.pokeID = '';
      state.singlePokemon = {} as IDetailsPokemon;
    },
  },
});

export const {setSinglePokemon, setLoading, setPokeID, resetState} =
  singlePokeReducer.actions;

export const getSinglePokemonAsync = createAsyncThunk(
  'singlePokeReducer/getSinglePokemonAsync',
  async (pokeID: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));

      const response = await fetch(`${BASE_URL}/pokemon/${pokeID}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }

      const data = (await response.json()) as IDetailsPokemon;

      thunkApi.dispatch(setSinglePokemon(data));
    } catch (error) {
      console.error('Failed to fetch Pokemon:', error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export default singlePokeReducer.reducer;
