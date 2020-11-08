import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createModalNavigator,
  ModalScreenProps,
} from 'react-navigation-native-modal';

type ModalParamList = {
  Home: undefined;
  First: undefined;
  Second: undefined;
};

function Home({ navigation }: ModalScreenProps<ModalParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <Button title="Push First" onPress={() => navigation.push('First')} />
      <Button title="Push Second" onPress={() => navigation.push('Second')} />
    </View>
  );
}

function First({ navigation }: ModalScreenProps<ModalParamList, 'First'>) {
  return (
    <View style={styles.container}>
      <Button title="Push Second" onPress={() => navigation.push('Second')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop to top" onPress={() => navigation.popToTop()} />
    </View>
  );
}

function Second({ navigation }: ModalScreenProps<ModalParamList, 'Second'>) {
  return (
    <View style={styles.container}>
      <Button title="Push First" onPress={() => navigation.push('First')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop to top" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const Modal = createModalNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Modal.Navigator>
        <Modal.Screen name="Home" component={Home} />
        <Modal.Screen name="First" component={First} />
        <Modal.Screen name="Second" component={Second} />
      </Modal.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
