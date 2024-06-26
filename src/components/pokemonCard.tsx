import React from 'react';
import {
  View,
  Text,
  Image,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {ISinglePokemon} from '../types/pokeTypes';
import {getOficialImg, windowWidth} from '../util/constants';
import {RootStackMainParams} from '../navigation/navigationMain';
import {useAppDispatch} from '../redux/store';
import {
  getSinglePokemonAsync,
  resetState,
  setPokeID,
} from '../redux/slices/singlePokemon';

type NavigationProp = StackScreenProps<RootStackMainParams, 'Details'>;

export const PokemonCard = ({item}: {item: ISinglePokemon}) => {
  const navigation = useNavigation<NavigationProp['navigation']>();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();

  const navigateDetails = (pokeID: string) => {
    dispatch(resetState());
    dispatch(setPokeID(pokeID));
    dispatch(getSinglePokemonAsync(pokeID));
    navigation.navigate('Details');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigateDetails(item.id)}
      key={item.id}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.7)'
            : Colors.lighter,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
        }}></View>
      <Image source={{uri: getOficialImg(item.id)}} style={styles.wrapperImg} />
      <Text style={styles.titlePoke}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    borderRadius: 10,
    width: windowWidth * 0.4,
    marginBottom: 12,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  wrapperImg: {width: '100%', height: 100, objectFit: 'contain'},
  titlePoke: {fontSize: 18, fontWeight: '800'},
});
