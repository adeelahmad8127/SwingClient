import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
// import KeyboardSpacer from 'react-native-keyboard-spacer';

import React, {Component} from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import styles from './styles';
import {Time} from '../../common';
import {NavigationService} from '../../utils';
import Colors from '../../theme/Colors';

export default class SignalModal extends Component {
  static propTypes = {
    isModalVisible: PropTypes.bool,
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {},
    type: 'delete',
  };

  state = {
    isModalVisible: this.props.isModalVisible,
    data: {},
  };

  show = (data) => {
    this.setState({
      isModalVisible: true,
      data,
    });
  };

  hide = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  getHighlightColor(label, value) {
    let bgColor = 'red';
    if (label === 'Pairs') {
      bgColor = Colors.green;
    } else if (label === 'Signal') {
      if (
        value === 'Buy at Market' ||
        value === 'Buy Limit' ||
        value === 'Buy Stop'
      ) {
        bgColor = Colors.green;
      }
    } else if (label === 'Status') {
      if (value === 'StopLoss') {
        bgColor = 'red';
      } else {
        bgColor = Colors.green;
      }
    }
    return bgColor;
  }

  onUpdatePress = () => {
    this.hide();
    NavigationService.push('Form Signal', {
      data: this.state.data,
    });
  };

  renderCurrency() {
    const {currency_pairs, order_type} = this.state.data;
    // let type;
    let color;
    console.log('signal', order_type);
    if (
      order_type === 'Buy at Market' ||
      order_type === 'Buy Limit' ||
      order_type === 'Buy Stop'
    ) {
      // type = 'BUY';
      color = Colors.green;
    } else if (
      order_type === 'Sell Limit' ||
      order_type === 'Sell Stop' ||
      order_type === 'Sell at Market'
    ) {
      color = 'red';
      // type = 'SELL';
    }
    return (
      <View style={[styles.currencyContainer, {backgroundColor: color}]}>
        <Text style={styles.title}>{currency_pairs}</Text>
      </View>
    );
  }

  renderSignal(placeholder, status) {
    return (
      <View style={[styles.signalContainer]}>
        <Text style={styles.signalPlaceholder}>{`${placeholder}:`}</Text>
        <View
          style={[
            styles.signalStatusContainer,
            {backgroundColor: this.getHighlightColor(placeholder, status)},
          ]}>
          <Text style={styles.signalStatusText}>{status}</Text>
        </View>
      </View>
    );
  }

  renderStatus(placeholder, value) {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusPlaceholder}>{`${placeholder}:`}</Text>
        <Text style={styles.statusValue}>{value}</Text>
      </View>
    );
  }

  renderDivider() {
    return <View style={styles.divider} />;
  }

  renderTime() {
    const {updated_at} = this.state.data;
    return <Time time={updated_at} />;
  }

  renderUpdateButton() {
    return (
      <TouchableOpacity
        onPress={this.onUpdatePress}
        style={styles.btnContainer}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
    );
  }
  _renderContent() {
    const {
      order_type,
      status,
      open_price,
      stope_loss,
      Target,
      p_l,
    } = this.state.data;
    const sign = status === 'Target' ? '+' : '';

    return (
      <View style={styles.contentContainer}>
        {this.renderCurrency()}
        {this.renderSignal('Signal', order_type)}
        {this.renderSignal('Status', status)}
        {this.renderDivider()}
        {this.renderStatus('Open Price', open_price)}
        {this.renderStatus('Stop Loss', stope_loss)}
        {this.renderStatus('Target', Target)}
        {this.renderStatus('P/L', `${sign}${p_l}`)}
        {this.renderDivider()}
        {this.renderTime()}
        {/* {this.renderUpdateButton()} */}
      </View>
    );
  }

  render() {
    const {isModalVisible} = this.state;
    return (
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={this.hide}
          onBackdropPress={this.hide}
          style={{}}>
          {this._renderContent()}
        </Modal>
        {/* {Util.isPlatformAndroid() && this.renderKeyboardSpacer()} */}
      </View>
    );
  }
}
