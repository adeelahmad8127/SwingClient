import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';
import Images from '../../theme/Images';
import {NavigationService} from '../../utils';

export default class Navbar extends Component {
  static propTypes = {
    hasDrawer: PropTypes.bool,
    hasBack: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    hasDrawer: true,
    hasBack: false,
    title: 'Navbar',
  };

  toggleDrawer = () => {
    NavigationService.toggleDrawer();
  };

  goBack = () => {
    NavigationService.pop();
  };

  renderLeftIcon() {
    const {hasDrawer, hasBack} = this.props;
    const onPress = hasDrawer ? this.toggleDrawer : this.goBack;
    const icon = hasDrawer ? Images.icons.drawer : Images.icons.back;
    return (
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    );
  }

  renderTitle() {
    const {title} = this.props;
    return <Text style={styles.title}>{title}</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLeftIcon()}
        {this.renderTitle()}
      </View>
    );
  }
}
