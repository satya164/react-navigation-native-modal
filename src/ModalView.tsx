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
          const descriptor = descriptors[route.key];
          const {
            animationType = 'slide',
            presentationStyle = 'fullScreen',
            ...options
          } = descriptor.options;

          if (index === 0) {
            return (
              <View style={StyleSheet.absoluteFill}>
                {descriptor.render()}
                {acc}
              </View>
            );
          }

          return (
            <Modal
              {...options}
              animationType={animationType}
              presentationStyle={presentationStyle}
              onRequestClose={() => {
                navigation.dispatch({
                  ...StackActions.pop(),
                  source: route.key,
                  target: state.key,
                });
              }}
              visible
            >
              {descriptor.render()}
              {acc}
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
