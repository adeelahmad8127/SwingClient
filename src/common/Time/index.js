import React, {Component} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

import styles from './styles';

export default class Time extends Component {
  renderLabel() {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Last Update</Text>
        <Text style={styles.label}>(GMT+0):</Text>
      </View>
    );
  }

  renderTime() {
    const {time} = this.props;
    return (
      <View>
        <Text style={styles.label}>{moment(time).format('hh:mm:ss A')}</Text>
        <Text style={styles.label}>{moment(time).format('DD-MM-YYYY')}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLabel()}
        {this.renderTime()}
      </View>
    );
  }
}
