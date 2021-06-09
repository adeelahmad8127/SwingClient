import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NavigationService} from '../../../utils';

export default class Item extends Component {
  onDatePress = () => {
    NavigationService.navigate('HistoryCurrency');
  };

  renderCurrencyTitle() {
    const {currency} = this.props.data;

    return <Text style={styles.dateText}>{currency}</Text>;
  }

  renderType() {
    const {type} = this.props.data;
    return (
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>{type}</Text>
      </View>
    );
  }

  renderDate() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.dateContainer}>
        {this.renderCurrencyTitle()}
        {this.renderType()}
      </TouchableOpacity>
    );
  }
  renderDivider() {
    return <View style={styles.divider} />;
  }
  render() {
    return (
      <View>
        {this.renderDate()}
        {this.renderDivider()}
      </View>
    );
  }
}
