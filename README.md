# react-navigation-native-modal

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

React Navigation integration for React Native's Modal component. This navigator works like a Stack Navigator, but each screen is shown as a modal using the `Modal` component from React Native.

> Currently the `presentationStyle` of `pageSheet` and `formSheet` are not usable on iOS because it's impossible to detect when they are closed via gesture. See https://github.com/facebook/react-native/issues/29319

## Demo

<a href="https://raw.githubusercontent.com/satya164/react-navigation-native-modal/main/assets/demo.mp4"><img src="https://raw.githubusercontent.com/satya164/react-navigation-native-modal/main/assets/demo.gif" width="360"></a>

## Installation

```sh
npm install @react-navigation/native react-navigation-native-modal
```

## Usage

To use this navigator, import it from `react-navigation-native-modal`:

```js
import { createModalNavigator } from 'react-navigation-native-modal';

const Modal = createModalNavigator();

function MyModal() {
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

Then you can navigate to any screen to show it as a modal:

```js
navigation.navigate('Profile');
```

The first screen in the stack is always rendered as a normal screen and not as a modal. But any subsequent screens will be rendered as modals.

### Options

All of the [props available on `Modal` component](https://reactnative.dev/docs/modal#props) can be specified in [options](https://reactnavigation.org/docs/screen-options) to configure the screens in the navigator, except `visible`, `onDismiss`, `onOrientationChange`, `onRequestClose` and `onShow`.

Example:

```js
<Modal.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    animationType: 'fade',
  }}
/>
```

Some of the defaults are different from the `Modal` component:

- `animationType` is set to `slide` instead of `none`

### Events

The navigator can [emit events](https://reactnavigation.org/docs/navigation-events) on certain actions. Supported events are:

#### `orientationChange`

This event is fired when the orientation changes while the modal is being displayed and on initial render. Same as the [`onOrientationChange` prop](https://reactnative.dev/docs/modal#onorientationchange).

It receives an object in the `data` property of the event, which contains the key `orientation` with the value `portrait` or `landscape`:

```js
console.log(e.data) // { orientation: 'portrait' }
```

Example:

```js
React.useEffect(() => {
  const unsubscribe = navigation.addListener('orientationChange', (e) => {
    // Do something
  });

  return unsubscribe;
}, [navigation]);
```

Only supported on iOS.

### Helpers

The modal navigator adds the following methods to the navigation prop:

#### `push`

Pushes a new screen to top of the modal stack and navigate to it. The method accepts following arguments:

- `name` - Name of the route to push onto the modal stack.
- `params` - Screen params to merge into the destination route (found in the pushed screen through `route.params`).

```js
navigation.push('Profile', { owner: 'Michaś' });
```

#### `pop`

Pops the current screen from the modal stack and navigates back to the previous screen. It takes one optional argument (`count`), which allows you to specify how many screens to pop back by.

```js
navigation.pop();
```

#### `popToTop`

Pops all of the screens in the modal stack except the first one and navigates to it.

```js
navigation.popToTop();
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

[build-badge]: https://img.shields.io/circleci/project/github/satya164/react-navigation-native-modal/main.svg?style=flat-square
[build]: https://circleci.com/gh/satya164/react-navigation-native-modal
[version-badge]: https://img.shields.io/npm/v/react-navigation-native-modal.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-navigation-native-modal
[license-badge]: https://img.shields.io/npm/l/react-navigation-native-modal.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
