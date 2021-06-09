import {
  StackActions,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.navigate(routeName, params);
}

function replace(routeName, params) {
  _navigator.dispatch(StackActions.replace(routeName, params));
}

function push(routeName, params) {
  _navigator.dispatch(StackActions.push(routeName, params));
}

function pop(number = 1) {
  _navigator.dispatch(StackActions.pop(number));
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

function getNavigator() {
  return _navigator;
}

function reset(routeName) {
  // _navigator.dispatch(
  //   StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName })],
  //   }),
  // );

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: routeName}],
  });
  _navigator.dispatch(resetAction);
}

function getCurrentRoute() {
  let route = _navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route.routeName;
}

// add other navigation functions that you need and export them

export default {
  replace,
  push,
  pop,
  setTopLevelNavigator,
  getCurrentRoute,
  getNavigator,
  navigate,
  reset,
  popToTop,
  toggleDrawer,
};
