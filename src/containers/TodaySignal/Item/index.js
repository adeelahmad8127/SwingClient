// import React, {Component} from 'react';
// import {Text, View, TouchableOpacity} from 'react-native';
// import styles from './styles';
// import {NavigationService} from '../../../utils';
// import Colors from '../../../theme/Colors';

// export default class Item extends Component {
//   onDatePress = () => {
//     NavigationService.navigate('HistoryCurrency');
//   };

//   getHighlightColor(label, value) {
//     let bgColor = 'red';
//     if (label === 'Pairs') {
//       bgColor = Colors.green;
//     } else if (label === 'Signal') {
//       if (
//         value === 'Buy at Market' ||
//         value === 'Buy Limit' ||
//         value === 'Buy Stop'
//       ) {
//         bgColor = Colors.green;
//       }
//     } else if (label === 'Status') {
//       if (value === 'StopLoss') {
//         bgColor = 'red';
//       } else {
//         bgColor = Colors.green;
//       }
//     }
//     return bgColor;
//   }

//   renderCurrencyTitle() {
//     const {currency} = this.props.data;

//     return <Text style={styles.dateText}>{currency}</Text>;
//   }

//   renderType() {
//     const {status} = this.props.data;
//     console.log('this.props.data', this.props.data);
//     return (
//       <View
//         style={[
//           styles.typeContainer,
//           {backgroundColor: this.getHighlightColor('Status', status)},
//         ]}>
//         <Text style={styles.typeText}>{status}</Text>
//       </View>
//     );
//   }

//   renderDate() {
//     const {onPress, data} = this.props;
//     return (
//       <TouchableOpacity
//         onPress={() => onPress(data)}
//         style={styles.dateContainer}>
//         {this.renderCurrencyTitle()}
//         {this.renderType()}
//       </TouchableOpacity>
//     );
//   }
//   renderDivider() {
//     return <View style={styles.divider} />;
//   }
//   render() {
//     return (
//       <View style={{paddingHorizontal: 20}}>
//         {this.renderDate()}
//         {this.renderDivider()}
//       </View>
//     );
//   }
// }
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
    console.log('this.props', this.props.data);
    const {index, data} = this.props;
    const textColor = index % 2 && {color: '#3399ff'};
    return <Text style={[styles.pairText, textColor]}>{data.currency}</Text>;
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
    const {profit_loss, status} = this.props.data;
    const pl = Math.sign(profit_loss) === 1 ? `+${profit_loss}` : profit_loss;
    let color;
    if (status === 'Target') {
      color = Colors.green;
    } else if (status === 'StopLoss') {
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
    const {profit_loss, signal} = this.props.data;
    // const type = Math.sign(profit_loss) === 1 ? 'BUY' : 'SELL';
    // const color = Math.sign(profit_loss) === 1 ? Colors.green : 'red';
    let type;
    let color;
    console.log('signal', signal);
    if (
      signal === 'Buy at Market' ||
      signal === 'Buy Limit' ||
      signal === 'Buy Stop'
    ) {
      type = 'BUY';
      color = Colors.green;
    } else if (
      signal === 'Sell Limit' ||
      signal === 'Sell Stop' ||
      signal === 'Sell at Market'
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
