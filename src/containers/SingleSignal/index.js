import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Item from './Item';
import styles from './styles';
import {Navbar} from '../../common';
import SignalModal from '../../models/SignalModal';

const DATA = [
  {currency: 'AUDCHF', type: 'Target-1'},
  {currency: 'AUDUSD', type: 'StopLoss'},
];

export default class SingleSignal extends Component {
  onPressItem = () => {
    this.signalModal.show();
  };

  renderItem = ({item, index}) => {
    return <Item data={item} onPress={this.onPressItem} />;
  };

  renderList() {
    return (
      <FlatList
        style={styles.container}
        data={DATA}
        renderItem={this.renderItem}
      />
    );
  }

  renderSignalModal() {
    return (
      <SignalModal
        ref={(ref) => {
          this.signalModal = ref;
        }}
      />
    );
  }

  renderNavbar() {
    return <Navbar title={'Signal'} hasDrawer={false} />;
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderList()}
        {this.renderSignalModal()}
      </>
    );
  }
}
