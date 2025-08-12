import * as React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  type NativeSyntheticEvent,
} from 'react-native';
import {
  NavigationHelpersContext,
  type StackNavigationState,
  type ParamListBase,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import type {
  ModalDescriptorMap,
  ModalNavigationConfig,
  ModalNavigationHelpers,
} from './types';

type Props = ModalNavigationConfig & {
  state: StackNavigationState<ParamListBase>;
  navigation: ModalNavigationHelpers;
  descriptors: ModalDescriptorMap;
};

export function ModalView({ state, navigation, descriptors }: Props) {
  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={styles.container}>
        {state.routes.reduceRight<React.JSX.Element>(
          (acc, route, index) => {
            const focused = index === state.index;
            const descriptor = descriptors[route.key];

            if (descriptor == null) {
              return acc;
            }

            const { animationType = 'slide', ...options } = descriptor.options;

            const element = (
              <>
                <View
                  style={StyleSheet.absoluteFill}
                  accessibilityElementsHidden={!focused}
                  importantForAccessibility={
                    focused ? 'auto' : 'no-hide-descendants'
                  }
                >
                  {descriptor.render()}
                </View>
                {acc}
              </>
            );

            if (index === 0) {
              return element;
            }

            const onOrientationChange = (
              e: NativeSyntheticEvent<{ orientation: 'portrait' | 'landscape' }>
            ) =>
              navigation.emit({
                type: 'orientationChange',
                target: route.key,
                data: e.nativeEvent,
              });

            const onOpen = () => {
              navigation.dispatch((s) => {
                if (
                  s.routeNames.includes(route.name) &&
                  !s.routes.some((r) => r.key === route.key)
                ) {
                  // If route isn't present in current state, but was closing, assume that a close animation was cancelled
                  // So we need to add this route back to the state
                  return CommonActions.navigate(route);
                } else {
                  return CommonActions.reset(s);
                }
              });
            };

            const onClose = () =>
              navigation.dispatch((s) => {
                // If a route exists in state, trigger a pop
                // This will happen in when the route was closed from native side
                // e.g. When the close animation triggered from a gesture ends
                if (s.routes.some((r) => r.key === route.key)) {
                  return {
                    ...StackActions.pop(),
                    source: route.key,
                    target: s.key,
                  };
                } else {
                  return CommonActions.reset(s);
                }
              });

            return (
              <Modal
                {...options}
                animationType={animationType}
                onOrientationChange={onOrientationChange}
                onShow={onOpen}
                onDismiss={onClose}
                onRequestClose={onClose}
                visible
              >
                {element}
              </Modal>
            );
          },
          <></>
        )}
      </View>
    </NavigationHelpersContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
