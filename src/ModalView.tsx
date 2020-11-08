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
        {state.routes.map((route, index) => {
          const descriptor = descriptors[route.key];

          if (index === 0) {
            return (
              <View key={route.key} style={StyleSheet.absoluteFill}>
                {descriptor.render()}
              </View>
            );
          }

          return (
            <Modal
              key={route.key}
              animationType="slide"
              presentationStyle="pageSheet"
              onRequestClose={() => {
                navigation.dispatch({
                  ...StackActions.pop(),
                  source: route.key,
                  target: state.key,
                });
              }}
            >
              {descriptor.render()}
            </Modal>
          );
        })}
      </View>
    </NavigationHelpersContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
