import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
  type StaticParamList,
} from '@react-navigation/native';
import {
  createModalNavigator,
  type ModalNavigationProp,
} from 'react-navigation-native-modal';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Go to First"
        onPress={() => navigation.navigate('First')}
      />
      <Button
        title="Go to Second"
        onPress={() => navigation.navigate('Second')}
      />
    </View>
  );
}

function First() {
  const navigation = useNavigation<ModalNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: 'papayawhip' }]}>
      <Button
        title="Go to Second"
        onPress={() => navigation.navigate('Second')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop to top" onPress={() => navigation.popToTop()} />
    </View>
  );
}

function Second() {
  const navigation = useNavigation<ModalNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: 'lavender' }]}>
      <Button
        title="Go to First"
        onPress={() => navigation.navigate('First')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Pop to top" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const Modal = createModalNavigator({
  screens: {
    Home: {
      screen: Home,
    },
    First: {
      screen: First,
    },
    Second: {
      screen: Second,
      options: {
        presentationStyle: 'pageSheet',
      },
    },
  },
});

const Navigation = createStaticNavigation(Modal);

export function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type RootStackParamList = StaticParamList<typeof Modal>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
