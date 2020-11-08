# react-navigation-native-modal

**THIS IS CURRENTLY UNUSABLE DUE TO LIMITATIONS AND BUGS IN REACT NATIVE'S MODAL**

React Navigation integration for React Native's Modal component.

## Installation

```sh
npm install @react-navigation/native react-navigation-native-modal
```

## Usage

```js
import { createModalNavigator } from 'react-navigation-native-modal';

const Modal = createModalNavigator();

function MyStack() {
  return (
    <Modal.Navigator>
      <Modal.Screen name="Home" component={Home} />
      <Modal.Screen name="Notifications" component={Notifications} />
      <Modal.Screen name="Profile" component={Profile} />
      <Modal.Screen name="Settings" component={Settings} />
    </Modal.Navigator>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
