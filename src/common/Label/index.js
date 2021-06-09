import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default class Label extends Component {
  render() {
    const {label} = this.props;
    return <Text style={styles.label}>{`${label}:`}</Text>;
  }
}
