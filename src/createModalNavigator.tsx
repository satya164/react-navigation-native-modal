import {
  StackRouter,
  createNavigatorFactory,
  useNavigationBuilder,
  type DefaultNavigatorOptions,
  type NavigationProp,
  type NavigatorTypeBagBase,
  type ParamListBase,
  type StackActionHelpers,
  type StackNavigationState,
  type StackRouterOptions,
  type StaticConfig,
  type TypedNavigator,
} from '@react-navigation/native';
import * as React from 'react';
import { ModalView } from './ModalView';
import type {
  ModalNavigationConfig,
  ModalNavigationEventMap,
  ModalNavigationOptions,
} from './types';

type ModalNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
  NavigatorID extends string | undefined = undefined,
> = NavigationProp<
  ParamList,
  RouteName,
  NavigatorID,
  StackNavigationState<ParamList>,
  ModalNavigationOptions,
  ModalNavigationEventMap
> &
  StackActionHelpers<ParamList>;

type Props = DefaultNavigatorOptions<
  ParamListBase,
  string | undefined,
  StackNavigationState<ParamListBase>,
  ModalNavigationOptions,
  ModalNavigationEventMap,
  ModalNavigationProp<ParamListBase>
> &
  StackRouterOptions &
  ModalNavigationConfig;

function ModalNavigator({
  id,
  initialRouteName,
  children,
  layout,
  screenLayout,
  screenOptions,
  screenListeners,
  UNSTABLE_router,
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
      id,
      initialRouteName,
      children,
      layout,
      screenLayout,
      screenOptions,
      screenListeners,
      UNSTABLE_router,
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

export function createModalNavigator<
  const ParamList extends ParamListBase,
  const NavigatorID extends string | undefined = undefined,
  const TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: StackNavigationState<ParamList>;
    ScreenOptions: ModalNavigationOptions;
    EventMap: ModalNavigationEventMap;
    NavigationList: {
      [RouteName in keyof ParamList]: ModalNavigationProp<
        ParamList,
        RouteName,
        NavigatorID
      >;
    };
    Navigator: typeof ModalNavigator;
  },
  const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>,
>(config?: Config): TypedNavigator<TypeBag, Config> {
  return createNavigatorFactory(ModalNavigator)(config);
}
