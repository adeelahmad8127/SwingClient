import React, {Component,useState,useEffect,useRef} from 'react';
import {FlatList, ActivityIndicator,BackHandler,View,Text,AppState} from 'react-native';
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
import * as Action from '../../user/actionIndex'

import { WP } from '../../utils/Responsive';
import Toast from 'react-native-tiny-toast';


const History =(props)=> {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState([])
  const [nodata, setNoData] = useState(false)
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(AppState.current);
  const [type, setType] = useState("")
  
  // useEffect(() => {
  //   props.navigation.addListener('focus', () => {
  //     getData()
  //   })
  // }, [])

  const getData =()=>{
    let params = { type : props.route.params.title}
    console.log(params)
    setData([])
    props.getHistory(params).then(response =>{
      setLoading(false)
      if (response !==undefined) {
        setData(response)
      }else{
        setNoData(true)
      }
    })
  }

  useEffect(() => {
    console.log('props',props.route.params.title)
    getData()

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    // return () => backHandler.remove()
  }, [props.route.params.title]);
  
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  const renderItem = ({item, index}) => {
    item.type = props.route.params.title
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