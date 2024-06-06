import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from '../redux/store';
import {getPokemonsAsync} from '../redux/slices/pokemons';
import {PokemonCard} from '../components/pokemonCard';
import {StandarWrapper} from '../components/standarWrapper';

const NUM_COLUMNS = 2;
const FLATLIST_MARGIN = 10;
const INITIAL_PAGE = 1;

export const Home = () => {
  const dispatch = useAppDispatch();
  const {totalPokemon, pokeList, page} = useSelector(
    (state: RootState) => state.pokeReducer,
  );

  useEffect(() => {
    if (page === 0) {
      dispatch(getPokemonsAsync(INITIAL_PAGE));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextPage = () => {
    if (page !== 0) {
      dispatch(getPokemonsAsync(page + 1));
    }
  };

  const renderFooter = () => {
    if (totalPokemon <= pokeList.length) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <StandarWrapper>
      <View style={styles.container}>
        <Text style={styles.textTitle}>POKE</Text>
        <Text style={styles.textSubTitle}>
          Discover {totalPokemon} species of Pokémon, current page: {page}
        </Text>
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          style={styles.flatList}
          data={pokeList}
          renderItem={({item}) => <PokemonCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={NUM_COLUMNS}
          onEndReached={loadNextPage}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </View>
    </StandarWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textSubTitle: {
    fontSize: 15,
    marginBottom: 22,
    color: '#666',
  },
  columnWrapper: {
    justifyContent: 'space-around',
  },
  flatList: {
    width: '100%',
    margin: FLATLIST_MARGIN,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});
