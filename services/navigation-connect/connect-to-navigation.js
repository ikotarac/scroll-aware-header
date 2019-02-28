import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import createScrollDriver from '../scroll-driver';

function connectToScrollDriverAndNavigation(
  scrollDriver,
  ScrollProviderComponent,
) {
  class ScrollConnect extends PureComponent {
    constructor(props) {
      super(props);

      const { navigation } = this.props;
      const { scrollOffset } = scrollDriver;

      navigation.setParams({ ...scrollOffset });

      this.ConnectedProviderComponent = scrollDriver.connectProvider(
        ScrollProviderComponent,
      );
    }

    render() {
      return <this.ConnectedProviderComponent {...this.props} />;
    }
  }

  return withNavigation(ScrollConnect);
}

export function connectToNavigationUsingDriver(driver) {
  return ScrollProviderComponent =>
    connectToScrollDriverAndNavigation(driver, ScrollProviderComponent);
}

export function connectToNavigation(ScrollProviderComponent) {
  return connectToScrollDriverAndNavigation(
    createScrollDriver(),
    ScrollProviderComponent,
  );
}
