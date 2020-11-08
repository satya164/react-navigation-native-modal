import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
  ParamListBase,
  StackActionHelpers,
} from '@react-navigation/native';
import ModalView from './ModalView';
import type {
  ModalNavigationConfig,
  ModalNavigationOptions,
  ModalNavigationEventMap,
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
