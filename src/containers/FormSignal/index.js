/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import styles from './styles';
import {TextAndInput, Label, Dropdown, Time, Navbar} from '../../common';
import {signalData} from '../../data';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationService} from '../../utils';

export default class FormSignal extends Component {
  constructor(props) {
    super(props);
    this.update = this.props.route.params !== undefined;
  }

  state = {
    date: '',
    status: '',
    openPrice: '',
    stopLoss: '',
    target: '',
    pips: '',
  };

  componentDidMount() {
    if (this.props.route.params !== undefined) {
      const {
        signal,
        status,
        open_price,
        stop_loss,
        target,
        profit_loss,
        date,
        currency,
        last_update,
      } = this.props.route.params.data;
      this.pairs.setValue(currency);
      this.signal.setValue(signal);
      this.status.setValue(status);
      this.setState({
        last_update,
        status,
        target,
        date,
        openPrice: open_price,
        stopLoss: stop_loss,
        pips: profit_loss,
      });
    }
  }

  onChangeOpenPrice = (value) => {
    let openPrice = value;
    if (value.length <= 1) {
      openPrice = value.slice(0, 1) + '.' + value.slice(1);
    }
    this.setState({openPrice, status: this.status.getValue()});
  };

  onChangeStopLoss = (value) => {
    let stopLoss = value;
    if (value.length <= 1) {
      stopLoss = value.slice(0, 1) + '.' + value.slice(1);
    }
    this.setState({stopLoss, status: this.status.getValue()});
  };

  onChangeTarget = (value) => {
    let target = value;
    if (value.length <= 1) {
      target = value.slice(0, 1) + '.' + value.slice(1);
    }
    this.setState({target, status: this.status.getValue()});
  };

  getPL = () => {
    const {openPrice, stopLoss, target, status} = this.state;
    let pl = '';
    if (status === 'StopLoss') {
      pl = (openPrice - stopLoss) * 10000;
    }
    if (status === 'Target') {
      pl = (openPrice - target) * 10000;
    }
    return pl.toString();
  };

  onPostPress = () => {
    if (
      this.pairs.getValue() !== '' &&
      this.signal.getValue() !== '' &&
      this.status.getValue() !== '' &&
      this.state.openPrice !== ''
    ) {
      const pairs = this.pairs.getValue();
      const date = moment().format('D-M-yyyy');
      const payload = {
        date: date,
        currency: pairs,
        signal: this.signal.getValue(),
        status: this.status.getValue(),
        open_price: this.state.openPrice,
        stop_loss: this.state.stopLoss,
        target: this.state.target,
        profit_loss: this.getPL(),
        last_update: Date.now(),
      };
      console.log('payload', payload);
      firebase
        .database()
        .ref(`signals/${date}/${pairs}`)
        .set(payload)
        .then(() => {
          NavigationService.navigate('Today Signal');
        });
    }
  };

  onUpdatePress = () => {
    if (
      this.pairs.getValue() !== '' &&
      this.signal.getValue() !== '' &&
      this.status.getValue() !== ''
    ) {
      const pairs = this.pairs.getValue();
      const date = this.state.date;
      const payload = {
        date: date,
        currency: pairs,
        signal: this.signal.getValue(),
        status: this.status.getValue(),
        open_price: this.state.openPrice,
        stop_loss: this.state.stopLoss,
        target: this.state.target,
        profit_loss: this.getPL(),
        last_update: Date.now(),
      };
      firebase
        .database()
        .ref(`signals/${date}/${pairs}`)
        .update(payload)
        .then(() => {
          NavigationService.navigate('Today Signal');
        });
    }
  };

  renderPairs() {
    return (
      // <View style={styles.pairsContainer}>
      <TextAndInput
        ref={(ref) => {
          this.pairs = ref;
        }}
        label={this.update && 'Pairs'}
        dropdown
        style={styles.pairs}
        data={signalData.currency}
        dropdownPlaceholder="Select Pairs"
        highlight={this.update}
      />

      // </View>
    );
  }

  renderSignal() {
    return (
      <TextAndInput
        ref={(ref) => {
          this.signal = ref;
        }}
        label="Signal"
        dropdown
        style={styles.signal}
        data={signalData.signal}
        dropdownPlaceholder="Select Signal"
        highlight={this.update}
      />
    );
  }
  renderStatus() {
    return (
      <TextAndInput
        ref={(ref) => {
          this.status = ref;
        }}
        label="Status"
        dropdown
        style={styles.status}
        data={signalData.status}
        dropdownPlaceholder="Select Status"
      />
    );
  }

  renderOpenPrice() {
    return (
      <View style={styles.inputContainer}>
        <Label label={'Open Price'} />
        <TextInput
          style={styles.input}
          value={this.state.openPrice}
          onChangeText={this.onChangeOpenPrice}
          keyboardType={'number-pad'}
          maxLength={6}
        />
      </View>
    );
  }
  renderTarget() {
    return (
      <View style={styles.inputContainer}>
        <Label label={'Target'} />
        <TextInput
          style={styles.input}
          value={this.state.target}
          onChangeText={this.onChangeTarget}
          keyboardType={'number-pad'}
          maxLength={6}
        />
      </View>
    );
  }
  renderProfitLoss() {
    return (
      <View style={styles.inputContainer}>
        <Label label={'P/L'} />
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={this.getPL()}
          keyboardType={'number-pad'}
          maxLength={6}
          placeholderTextColor="red"
          editable={false}
        />
      </View>
    );
  }
  renderStopLoss() {
    return (
      <View style={styles.inputContainer}>
        <Label label={'Stop Loss'} />
        <TextInput
          style={styles.input}
          value={this.state.stopLoss}
          onChangeText={this.onChangeStopLoss}
          keyboardType={'number-pad'}
          maxLength={6}
        />
      </View>
    );
  }
  renderClosePrice() {
    return (
      <TextAndInput
        ref={(ref) => {
          this.closePrice = ref;
        }}
        label="Close Price"
      />
    );
  }

  renderDivider() {
    return <View style={styles.divider} />;
  }

  renderTime() {
    const time = this.update ? this.state.last_update : Date.now();
    return <Time time={time} />;
  }

  renderPostButton() {
    const btnTitle = this.update ? 'UPDATE' : 'POST';
    const btnPress = this.update ? this.onUpdatePress : this.onPostPress;
    return (
      <View style={styles.btnTopContainer}>
        <TouchableOpacity onPress={btnPress} style={styles.btnContainer}>
          <Text style={styles.btnText}>{btnTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNavbar() {
    const hasDrawer = !this.update;
    return <Navbar title={'Form Signal'} hasDrawer={hasDrawer} />;
  }
  render() {
    return (
      <>
        {this.renderNavbar()}
        <ScrollView style={styles.container}>
          {this.renderPairs()}
          {this.renderSignal()}
          {this.renderStatus()}
          {this.renderDivider()}
          {this.renderOpenPrice()}
          {this.renderStopLoss()}
          {this.renderTarget()}
          {this.renderProfitLoss()}
          {this.renderDivider()}
          {this.renderTime()}
          {this.renderPostButton()}
        </ScrollView>
      </>
    );
  }
}
