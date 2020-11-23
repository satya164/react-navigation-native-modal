import * as React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import {
  NavigationHelpersContext,
  StackNavigationState,
  ParamListBase,
  StackActions,
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

export default function ModalView({ state, navigation, descriptors }: Props) {
  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={styles.container}>
        {state.routes.reduceRight<JSX.Element>((acc, route, index) => {
          const focused = index === state.index;
          const descriptor = descriptors[route.key];
          const {
            animationType = 'slide',
            presentationStyle = 'fullScreen',
            ...options
          } = descriptor.options;

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

          return (
            <Modal
              {...options}
              animationType={animationType}
              presentationStyle={presentationStyle}
              onShow={() =>
                navigation.emit({
                  type: 'show',
                  target: route.key,
                })
              }
              onDismiss={() =>
                navigation.emit({
                  type: 'dismiss',
                  target: route.key,
                })
              }
              onOrientationChange={(e) =>
                navigation.emit({
                  type: 'orientationChange',
                  target: route.key,
                  data: e.nativeEvent,
                })
              }
              onRequestClose={() => {
                navigation.dispatch({
                  ...StackActions.pop(),
                  source: route.key,
                  target: state.key,
                });
              }}
              visible
            >
              {element}
            </Modal>
          );
        }, <></>)}
      </View>
    </NavigationHelpersContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
