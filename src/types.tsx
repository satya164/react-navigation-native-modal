import type { Modal } from 'react-native';
import type {
  Route,
  ParamListBase,
  NavigationProp,
  Descriptor,
  NavigationHelpers,
  RouteProp,
  StackNavigationState,
  StackActionHelpers,
} from '@react-navigation/native';

export type Scene = {
  route: Route<string>;
  focused: boolean;
  color?: string;
};

export type ModalNavigationConfig = {};

export type ModalNavigationOptions = Omit<
  React.ComponentProps<typeof Modal>,
  'visible' | 'onDismiss' | 'onOrientationChange' | 'onRequestClose' | 'onShow'
>;

export type ModalNavigationEventMap = {
  /**
   * Event which fires when the orientation changes while the modal is being displayed.
   * The orientation provided is only 'portrait' or 'landscape'.
   * This event also fires on initial render, regardless of the current orientation.
   * Only supported on iOS.
   */
  orientationChange: { data: { orientation: 'portrait' | 'landscape' } };
};

export type ModalNavigationHelpers = NavigationHelpers<
  ParamListBase,
  ModalNavigationEventMap
>;

export type ModalNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  StackNavigationState<ParamList>,
  ModalNavigationOptions,
  ModalNavigationEventMap
> &
  StackActionHelpers<ParamList>;

export type ModalScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: ModalNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

export type ModalDescriptor = Descriptor<
  ParamListBase,
  string,
  StackNavigationState<ParamListBase>,
  ModalNavigationOptions
>;

export type ModalDescriptorMap = {
  [key: string]: ModalDescriptor;
};
