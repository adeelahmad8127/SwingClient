import {head} from 'lodash';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Navbar} from '../../common';
import {WP} from '../../utils/Responsive';
import * as Actions from '../../user/actionIndex';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { setType } from './TradingType';
const Home = (props) => {
  const [data, setData] = useState([{win : 0},{loss: 0}, {total : 0}]);
  const [load, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [route, setRoute] = useState(null)
  useEffect(() => {
    getStats();
    props.navigation.addListener('focus', () => {
      setRoute("TradingType")
    })
  }, []);

  const getStats = () => {
    setLoading(true);
    props.getStats().then((response) => {
      setLoading(false);
      if (response !== undefined) {
        console.log(response);
        setData(response);
        setLoading(false);
      }
    });
  };

  const calculatePercentage = () => {
    let win = parseInt(data[0].win);
    let loss = parseInt(data[1].loss);
    if (win + loss !== 0) {
      return (win / (win + loss)) * 100;
    } else {
      return 0;
    }
  };

  return (
    <View style={{width: '100%', height: '100%', marginTop: WP(5)}}>
      <Navbar title={'Home'} />
      { 
            <View style={{ flex: 1}}>
            
              <View style={styles.container}>
                <View style={styles.upperSubContainer}>
                  <TouchableOpacity 
                  onPress={()=>{
                    props.navigation.navigate(route,{api_data : data,title : "Day Trading",type : 0})
                }}
                  style={{alignItems: 'center'}}>
                    <Text style={styles.heading1}>Day Trading</Text>
                    <Image
                      style={styles.image1}
                      source={require('../../assets/icons/day_trading.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=>{
                    props.navigation.navigate(route,{api_data : data,title : "Swing Trading",type : 1})
                  }}
                    style={{alignItems: 'center', marginLeft: WP(12)}}>
                    <Text style={styles.heading1}>Swing Trading</Text>
                    <Image
                      style={styles.image1}
                      source={require('../../assets/icons/swing_trading.jpg')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.lowerSubContainer}>
                  <Text style={styles.heading2}>Signal Performance</Text>
                  <View style={{flexDirection: 'row', marginTop: WP(5)}}>
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.circleBlack}>
                        <Text style={styles.percentValue}>{data[2].total}</Text>
                      </View>
                      <Text style={styles.heading3}>Total Trades</Text>
                    </View>

                    <View style={{alignItems: 'center', marginLeft: WP(10)}}>
                      <View style={styles.circleBlack}>
                        <Text style={styles.percentValue}>
                          {calculatePercentage()}
                        </Text>
                      </View>
                      <Text style={styles.heading3}>Winning%</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: WP(5)}}>
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.circleGreen}>
                        <Text style={styles.percentValueGreen}>
                          {data[0].win}
                        </Text>
                      </View>
                      <Text style={styles.percentValueGreen}>Wins</Text>
                    </View>

                    <View style={{alignItems: 'center', marginLeft: WP(10)}}>
                      <View style={styles.circleRed}>
                        <Text style={styles.percentValueRed}>
                          {data[1].loss}
                        </Text>
                      </View>
                      <Text style={styles.percentValueRed}>Loss</Text>
                    </View>
                  </View>
                </View>
              </View>
              {load ? <ActivityIndicator style= {{position : 'absolute' ,top : 0, left : 0, right : 0, bottom : 0, zIndex : 10}} size="large" color="#0000ff"/> : null}
      
            </View>
      
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP(100),
    flex: 3,
    backgroundColor: '#000',
  },
  upperSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading1: {
    color: '#fff',
    fontSize: WP(5),
  },
  heading2: {
    color: '#000',
    fontSize: WP(7),
  },
  image1: {
    marginTop: WP(2),
    width: WP(30),
    height: WP(30),
    borderRadius: WP(5),
  },
  lowerSubContainer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingTop: WP(2),
    borderRadius: WP(5),
    margin: WP(5),
    alignItems: 'center',
  },
  circleBlack: {
    width: WP(30),
    height: WP(30),
    borderColor: '#000',
    borderWidth: WP(1),
    borderRadius: WP(20),
    marginBottom: WP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleGreen: {
    width: WP(30),
    height: WP(30),
    borderColor: '#2cb82c',
    borderWidth: WP(1),
    borderRadius: WP(20),
    alignItems: 'center',
    marginBottom: WP(2),
    justifyContent: 'center',
  },
  circleRed: {
    width: WP(30),
    height: WP(30),
    borderColor: '#ff0000',
    borderWidth: WP(1),
    borderRadius: WP(20),
    alignItems: 'center',
    marginBottom: WP(2),
    justifyContent: 'center',
  },
  percentValue: {
    color: '#000',
    marginTop: WP(-2),
    fontSize: WP(7),
  },
  percentValueRed: {
    color: '#ff0000',
    marginTop: WP(-2),
    fontSize: WP(7),
  },
  percentValueGreen: {
    color: '#2cb82c',
    marginTop: WP(-2),
    fontSize: WP(7),
  },
  heading3: {
    color: '#000',
    fontSize: WP(6),
  },
});

const mapDispatchToProps = (dispatch) => {
  // login: authActions.login,
  return {
    getStats: (params) => dispatch(Actions.getStats(params)),
  };
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
