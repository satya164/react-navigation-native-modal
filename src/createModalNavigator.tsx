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

type Props = DefaultNavigatorOptions<
  ParamListBase,
  StackNavigationState<ParamListBase>,
  ModalNavigationOptions,
  ModalNavigationEventMap
> &
  StackRouterOptions &
  ModalNavigationConfig;

function ModalNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
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
    <NavigationContent>
      <ModalView
        {...rest}
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    </NavigationContent>
  );
}

export default createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  ModalNavigationOptions,
  ModalNavigationEventMap,
  typeof ModalNavigator
>(ModalNavigator);
