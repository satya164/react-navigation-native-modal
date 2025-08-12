import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { render } from '@testing-library/react-native';
import {
  NavigationContainer,
  type ParamListBase,
} from '@react-navigation/native';
import { createModalNavigator, type ModalScreenProps } from '../index';

jest.useFakeTimers();
test('renders a modal navigator with screens', async () => {
  const Test = ({ route, navigation }: ModalScreenProps<ParamListBase>) => (
    <View>
      <Text>Screen {route.name}</Text>
      <Button onPress={() => navigation.navigate('A')} title="Go to A" />
      <Button onPress={() => navigation.navigate('B')} title="Go to B" />
    </View>
  );

  const Modal = createModalNavigator();

  const { queryByText } = render(
    <NavigationContainer>
      <Modal.Navigator>
        <Modal.Screen name="A" component={Test} />
        <Modal.Screen name="B" component={Test} />
      </Modal.Navigator>
    </NavigationContainer>
  );

  expect(queryByText('Screen A')).not.toBeNull();
  expect(queryByText('Screen B')).toBeNull();
});
