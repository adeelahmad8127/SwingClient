import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';
import Item from './Item';
import {historyData} from '../../data';
import styles from './styles';
import {Navbar, Loader} from '../../common';
import SignalModal from '../../models/SignalModal';

export default class TodaySignal extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    const date = moment().format('D-M-yyyy');
    firebase
      .database()
      .ref(`signals/${date}`)
      .on('value', (snapshot) => {
        this.setState({data: _.toArray(snapshot.val()), loading: false});
      });
  }

  onPressItem = (data) => {
    this.signalModal.show(data);
  };

  renderItem = ({item, index}) => {
    return <Item data={item} index={index} onPress={this.onPressItem} />;
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Pairs</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
    );
  };

  renderList() {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{paddingTop: 10}}
        data={this.state.data}
        renderItem={this.renderItem}
        // ListHeaderComponent={this.renderHeader}
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

  renderLoader() {
    const {loading} = this.state;
    return <Loader loading={loading} color={'#fff'} />;
  }

  renderNavbar() {
    return <Navbar title={'Today Live Signal'} />;
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderList()}
        {this.renderSignalModal()}
        {this.renderLoader()}
      </>
    );
  }
}
