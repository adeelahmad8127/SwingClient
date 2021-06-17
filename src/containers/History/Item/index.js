import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NavigationService} from '../../../utils';

export default class Item extends Component {
  onDatePress = () => {
    NavigationService.navigate('HistoryCurrency', {
      date: this.props.data.created_date,
    });
  };

  renderDate() {
    const {data} = this.props;
    return (
      <TouchableOpacity onPress={this.onDatePress} style={styles.dateContainer}>
        <Text style={styles.dateText}>{data.created_date}</Text>
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
