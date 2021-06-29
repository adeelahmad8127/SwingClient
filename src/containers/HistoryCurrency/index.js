import React, { Component, useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';
import Item from './Item';
import { historyData } from '../../data';
import styles from './styles';
import { Navbar, Loader } from '../../common';
import { connect } from 'react-redux';
import SignalModal from '../../models/SignalModal';
import * as Action from '../../user/actionIndex'
import { getSignal } from '../../user/actionTypes';
import { WP } from '../../utils/Responsive';

const HistoryCurrency = (props) => {


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [signalModal, setSignalModal] = useState(null)


  useEffect(() => {
    console.log(props.route.params)
    callAPI()
  }, [])

  useEffect(() => {
    console.log("+++++++++++++++++++--------------", props)
    callAPI()
  }, [props.route.params])
  const callAPI = () => {
    let params
    if (props.route.params.calledFrom !== undefined) {

      if (props.route.params.calledFrom === 'home') {

        params = {
          date: moment().format('YYYY-MM-DD', new Date()),
          type: props.route.params.title
        }
      } else {

        params = {
          date: props.route.params.date,
          type: props.route.params.type
        }
      }
    }else{      
      params = {
        date: props.route.params.date,
        type: props.route.params.type
      }
    }
    props.getSignal(params).then(res => {
      setLoading(false)
      if (res !== undefined) {

      }
      setData(res)

    })
  }


  const onPressItem = (data) => {
    signalModal.show(data);
  };

  const renderItem = ({ item, index }) => {
    return <Item data={item} index={index} onPress={onPressItem} />;
  };

  const renderList = () => {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{ marginTop: 20 }}
        data={data}
        renderItem={renderItem}
      />
    );
  }

  const renderSignalModal = () => {
    return (
      <SignalModal
        ref={(ref) => {
          setSignalModal(ref)
        }}
      />
    );
  }

  const renderLoader = () => {
    return <Loader loading={loading} color={'#fff'} />;
  }

  const renderNavbar = () => {
    return <Navbar title={'History Currency'} hasDrawer={false} />;
  }

  return (
    <View style={{ marginTop: WP(5), width: '100%', height: '100%' }}>
      {renderNavbar()}
      {renderList()}
      {renderSignalModal()}
      {renderLoader()}
    </View>
  );

}

const mapDispatchToProps = (dispatch) => {
  // login: authActions.login,
  return {
    getSignal: (params) => dispatch(Action.getSignal(params)),
  };
};

const mapStateToProps = (store) => ({
  isSubscribed: store.auth.subscriptionActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCurrency);