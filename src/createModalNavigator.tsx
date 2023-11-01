import {
  StackRouter,
  createNavigatorFactory,
  useNavigationBuilder,
  type DefaultNavigatorOptions,
  type ParamListBase,
  type StackActionHelpers,
  type StackNavigationState,
  type StackRouterOptions,
} from '@react-navigation/native';
import * as React from 'react';
import ModalView from './ModalView';
import type {
  ModalNavigationConfig,
  ModalNavigationEventMap,
  ModalNavigationOptions,
} from './types';

type Props = DefaultNavigatorOptions<ModalNavigationOptions> &
  StackRouterOptions &
  ModalNavigationConfig;

function ModalNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    StackNavigationState<ParamListBase>,
    StackRouterOptions,
    StackActionHelpers<ParamListBase>,
    ModalNavigationOptions,
    ModalNavigationEventMap
  >(StackRouter, {
    initialRouteName,
    children,
    screenOptions,
  });

  return (
    <ModalView
      {...rest}
      state={state}
      descriptors={descriptors}
      navigation={navigation}
    />
  );
}

export default createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  ModalNavigationOptions,
  ModalNavigationEventMap,
  typeof ModalNavigator
>(ModalNavigator);
