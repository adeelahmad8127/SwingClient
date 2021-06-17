import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import ProTypes from 'prop-types';

import styles from './styles';
import Images from '../../../theme/Images';
import {NavigationService} from '../../../utils';
import Colors from '../../../theme/Colors';

export default class Item extends Component {
  static propTypes = {
    style: ProTypes.object,
    data: ProTypes.object.isRequired,
  };

  static defaultTypes = {
    style: {},
  };

  onPressItem = () => {
    this.props.onPress(this.props.data);
  };

  renderPairs() {
    const {index, data} = this.props;
    const textColor = index % 2 && {color: '#3399ff'};
    return <Text style={[styles.pairText, textColor]}>{data.currency_pairs}</Text>;
  }

  renderStatus() {
    const {status, signal} = this.props.data;
    let color = '#000';
    if (status === 'Target') {
      color = Colors.green;
    } else if (status === 'StopLoss') {
      color = 'red';
    }
    return (
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, {color: color}]}>{status}</Text>
        {/* <Text style={styles.statusText2}>{signal}</Text> */}
      </View>
    );
  }

  renderProfitLoss() {
    let data = this.props.data;
    const pl = Math.sign(data.stope_loss) === 1 ? `+${data.stope_loss}` : data.stope_loss;
    let color;
    if (data.status === 'Target') {
      color = Colors.green;
    } else if (data.status === 'StopLoss') {
      color = 'red';
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.statusText}>P/L</Text>
        <Text style={[styles.statusText2, {color: color}]}>{pl}</Text>
      </View>
    );
  }

  renderButton() {
    const {profit_loss, order_type} = this.props.data;
    // const type = Math.sign(profit_loss) === 1 ? 'BUY' : 'SELL';
    // const color = Math.sign(profit_loss) === 1 ? Colors.green : 'red';
    let type;
    let color;
    if (
      order_type === 'Buy at Market' ||
      order_type === 'Buy Limit' ||
      order_type === 'Buy Stop'
    ) {
      type = 'BUY';
      color = Colors.green;
    } else if (
      order_type === 'Sell Limit' ||
      order_type === 'Sell Stop' ||
      order_type === 'Sell at Market'
    ) {
      color = 'red';
      type = 'SELL';
    }
    return (
      <View style={styles.buySellContainer}>
        <Text style={[styles.buysellText, {color: color}]}>{type}</Text>
        <Image style={styles.rightArrow} source={Images.icons.rightArrow} />
      </View>
    );
  }

  render() {
    const {style, index} = this.props;
    const backgroundColor = index % 2 && {backgroundColor: '#ccc'};
    return (
      <TouchableOpacity
        onPress={this.onPressItem}
        style={[styles.container, style, backgroundColor]}>
        {this.renderPairs()}
        {this.renderStatus()}
        {this.renderProfitLoss()}
        {this.renderButton()}
      </TouchableOpacity>
    );
  }
}
