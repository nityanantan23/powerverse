import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IPokemonRes, ISinglePokemon} from '../../types/pokeTypes';
import {BASE_URL} from '../../util/constants';

interface IStatePoke {
  pokeList: ISinglePokemon[];
  isShowPokemonImg: boolean;
  page: number;
  limit: number;
  totalPokemon: number;
}

const initial_state: IStatePoke = {
  pokeList: [],
  isShowPokemonImg: false,
  page: 0,
  limit: 10,
  totalPokemon: 0,
};

const PAGE_MULTIPLIER = 10;

const pokeReducer = createSlice({
  name: 'pokeReducer',
  initialState: initial_state,
  reducers: {
    getPokemons: (
      state: IStatePoke,
      action: PayloadAction<ISinglePokemon[]>,
    ) => {
      state.pokeList = [...state.pokeList, ...action.payload];
    },
    setShowPokemonImg: (state: IStatePoke, action: PayloadAction<boolean>) => {
      state.isShowPokemonImg = action.payload;
    },
    setPage: (state: IStatePoke, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCountPokes: (state: IStatePoke, action: PayloadAction<number>) => {
      state.totalPokemon = action.payload;
    },
  },
});

export const {getPokemons, setShowPokemonImg, setPage, setCountPokes} =
  pokeReducer.actions;

export const getPokemonsAsync = createAsyncThunk(
  'pokeReducer/getPokemonsAsync',
  async (pageVal: number, {dispatch, getState}: any) => {
    const {limit, page} = getState().pokeReducer;
    const pageTarget = pageVal <= 1 ? 0 : pageVal * PAGE_MULTIPLIER;
    if (page > pageTarget) {
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${pageTarget}`,
      );
      const {count, results} = (await response.json()) as IPokemonRes;

      const newData = results.map(poke => {
        return {
          ...poke,
          id: poke.url.split('/')[6],
        };
      });
      dispatch(setCountPokes(count));
      dispatch(setPage(page + 1));
      dispatch(getPokemons(newData));
    } catch (error) {
      console.error('Failed to fetch pokemons', error);
    }
  },
);

export default pokeReducer.reducer;
