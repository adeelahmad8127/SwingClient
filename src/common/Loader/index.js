// @flow
import React from 'react';
import Modal from 'react-native-modal';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import styles from './styles';

export default class Loading extends React.Component {
  render() {
    const {color, loading} = this.props;
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={loading} />
        <Modal
          style={styles.modal}
          backdropOpacity={0.1}
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={loading}>
          <View style={styles.container}>
            <ActivityIndicator animating size="large" color={color} />
          </View>
        </Modal>
      </View>
    );
  }
}
