import React, {Component,useState,useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';
import Item from './Item';
import {historyData} from '../../data';
import styles from './styles';
import {Navbar, Loader} from '../../common';
import {connect} from 'react-redux';
import SignalModal from '../../models/SignalModal';
import * as Action from '../../user/actionIndex'
import { getSignal } from '../../user/actionTypes';

const HistoryCurrency=(props)=> {
  

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    callAPI()
    
  }, [])

  const callAPI =() =>{
    props.getSignal(props.route.params.date).then(res =>{
      // this.setState({loading:false, data : res})
      setLoading(false)
      if (res !== undefined) {
        
      }
      setData(res)
      
    })
  }
  

  const onPressItem = (data) => {
    signalModal.show(data);
  };

  const renderItem = ({item, index}) => {
    return <Item data={item} index={index} onPress={onPressItem} />;
  };

  const renderList =()=>{
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{marginTop: 20}}
        data={data}
        renderItem={renderItem}
      />
    );
  }

  const renderSignalModal=()=> {
    return (
      <SignalModal
        ref={(ref) => {
          signalModal = ref;
        }}
      />
    );
  }

  renderLoader =()=> {
    return <Loader loading={loading} color={'#fff'} />;
  }

  renderNavbar=()=> {
    return <Navbar title={'History Currency'} hasDrawer={false} />;
  }

    return (
      <>
        {renderNavbar()}
        {renderList()}
        {renderSignalModal()}
        {renderLoader()}
      </>
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