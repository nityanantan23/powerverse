import React, {useState} from 'react'; // Import React object
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

import {NativeModules} from 'react-native';
const {DeviceChecker} = NativeModules;

export function IsSimulator() {
  const [isSimulator, setIsSimulator] = useState(false);

  DeviceChecker.isSimulator()
    .then((isSim: any) => {
      console.log('isSim', isSim);
      setIsSimulator(isSim);
    })
    .catch((error: any) => {
      console.error(error);
    });

  return (
    <SafeAreaView style={styles.container}>
      {isSimulator ? (
        <View style={styles.simulatorView}>
          <Text style={styles.simulatorText}>Simulator is being used</Text>
        </View>
      ) : (
        <View style={styles.simulatorView}>
          <Text style={styles.simulatorText}>Device is not a simulator</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  simulatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  simulatorText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333',
  },
});

export default IsSimulator;
