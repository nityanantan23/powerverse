import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';

import {RootStackMainParams} from '../navigation/navigationMain';
import {LoadingScreen} from '../components/loadingScreen';
import {RootState} from '../redux/store';
import {getOficialImg, windowHeight, windowWidth} from '../util/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorByType} from '../util/typeColor';

interface Props extends StackScreenProps<RootStackMainParams, 'Details'> {}

export const Details = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {isLoading, singlePokemon} = useSelector(
    (state: RootState) => state.singlePokeReducer,
  );

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';

  const spriteSources = [
    singlePokemon?.sprites?.front_default,
    singlePokemon?.sprites?.front_default,
    singlePokemon?.sprites?.back_shiny,
    singlePokemon?.sprites?.front_shiny,
  ];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <StatusBar
        backgroundColor={backgroundColor}
        showHideTransition="slide"
        barStyle={barStyle}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.safeAreaContent}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="arrow-back-ios"
                size={23}
                color={backgroundColor}
              />
            </TouchableOpacity>
            <Text style={styles.textTitle}>{singlePokemon.name}</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={{uri: getOficialImg(singlePokemon.id)}}
              style={styles.mainImage}
            />
            <View style={styles.containerType}>
              {singlePokemon.types.map(item => (
                <View
                  key={item.type.name}
                  style={[
                    styles.wrapperTypes,
                    {
                      backgroundColor:
                        colorByType[
                          item.type.name as unknown as keyof typeof colorByType
                        ],
                    },
                  ]}>
                  <Text style={styles.typeText}>{item.type.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.spriteContainer}>
              {spriteSources.map((source, index) => (
                <Image
                  key={index}
                  source={{uri: source}}
                  style={styles.spriteImage}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  safeAreaContent: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
    margin: 10,
  },
  containerType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  wrapperTypes: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 8,
    minWidth: 110,
    borderRadius: 25,
  },
  spriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  spriteImage: {
    margin: 10,
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    borderRadius: 15,
  },
  mainImage: {
    height: windowHeight * 0.36,
    borderRadius: 15,
  },
  typeText: {
    fontSize: windowWidth * 0.06,
    fontWeight: '500',
  },
});
