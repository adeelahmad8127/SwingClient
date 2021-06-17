import React, {Component,useState,useEffect} from 'react';
import {FlatList, ActivityIndicator,View,Text} from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';
import Item from './Item';
import styles from './styles';
import {Navbar, Loader} from '../../common';
import auth from '@react-native-firebase/auth';
import {authActions} from '../../ducks/auth';
import {connect} from 'react-redux';
import * as Action from '../../user/actionIndex'

import * as actions from '../../user/actionTypes'
import { WP } from '../../utils/Responsive';


const History =(props)=> {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState([])
  const [nodata, setNoData] = useState(false)


  useEffect(() => {
    props.getHistory().then(response =>{
      setLoading(false)
      if (response !==undefined) {
        setData(response)
      }else{
        setNoData(true)
      }
    })
  }, [])


  const renderItem = ({item, index}) => {
    return <Item data={item} />;
  };

  const renderList=()=> {
    return (
      <FlatList
        style={styles.container}
        data={data}
        renderItem={renderItem}
      />
    );
  }

  const renderLoader =()=> {
    return <Loader loading={loading} color={'#fff'} />;
  }

  const renderNavbar =()=> {
    return <Navbar hasDrawer={false} title={'History'} />;
  } 

    return (
      <View style={{marginTop : WP(5)}}>
        {renderNavbar()}
        {!nodata ? renderList() : 
          <View style ={{backgroundColor : '#000',width : '100%',height: '100%',alignItems : 'center', justifyContent : 'center'}}>
            <Text style = {{color :'#fff'}}>No data available</Text>
          </View>
        }
        {renderLoader()}
      </View>
    );
}



const mapDispatchToProps = (dispatch) => {
  // login: authActions.login,
  return {
    getHistory: (params) => dispatch(Action.getHistory(params)),
  };
};

const mapStateToProps = (store) => ({
  isSubscribed: store.auth.subscriptionActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);