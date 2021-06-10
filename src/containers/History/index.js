import React, {Component} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';
import Item from './Item';
import styles from './styles';
import {Navbar, Loader} from '../../common';
import auth from '@react-native-firebase/auth';
import {authActions} from '../../ducks/auth';
import {connect} from 'react-redux';

import * as actions from '../../user/actionTypes'

class History extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    console.log('auth().currentUser', auth().currentUser);
    const date = moment().format('D-M-yyyy');
    console.log('date', date);
    firebase
      .database()
      .ref('signals')
      .on('value', (snapshot) => {
        console.log('snapshot.val()', snapshot.val());
        if (snapshot.val() !== null) {
          const history = Object.keys(snapshot.val());
          console.log('history', history);
          let getTimestamp = (str) => +new Date(...str.split('-').reverse());
          history.sort((a, b) => getTimestamp(a) - getTimestamp(b));
          const dates = history.filter((e) => e !== date);
          this.setState({data: dates.reverse()});
        }
        this.setState({loading: false});
      });
  }


  renderItem = ({item, index}) => {
    return <Item data={item} />;
  };

  renderList() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={this.renderItem}
      />
    );
  }

  renderLoader() {
    const {loading} = this.state;
    return <Loader loading={loading} color={'#fff'} />;
  }

  renderNavbar() {
    return <Navbar title={'History'} />;
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderList()}
        {this.renderLoader()}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = (store) => ({
  isSubscribed: store.auth.subscriptionActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);