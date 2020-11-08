import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createModalNavigator, ModalScreenProps } from '../index';

it('renders a modal navigator with screens', async () => {
  const Test = ({ route, navigation }: ModalScreenProps<ParamListBase>) => (
    <View>
      <Text>Screen {route.name}</Text>
      <Button onPress={() => navigation.navigate('A')} title="Go to A" />
      <Button onPress={() => navigation.navigate('B')} title="Go to B" />
    </View>
  );

  const Modal = createModalNavigator();

  const { findByText, queryByText } = render(
    <NavigationContainer>
      <Modal.Navigator>
        <Modal.Screen name="A" component={Test} />
        <Modal.Screen name="B" component={Test} />
      </Modal.Navigator>
    </NavigationContainer>
  );

  expect(queryByText('Screen A')).not.toBeNull();
  expect(queryByText('Screen B')).toBeNull();

  fireEvent.press(await findByText('Go to B'));

  expect(queryByText('Screen B')).not.toBeNull();
});
