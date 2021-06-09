import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text, View} from 'react-native';

export default class Dropdown extends Component {
  state = {
    value: '',
    country: 'uk',
  };
  render() {
    return (
      <DropDownPicker
        zIndex={5000}
        items={[
          {
            label: 'UK',
            value: 'uk',
          },
          {
            label: 'France',
            value: 'france',
          },
        ]}
        defaultValue={this.state.country}
        containerStyle={{height: 50, zIndex: 10}}
        style={{backgroundColor: '#fafafa', flex:1}}
        itemStyle={
          {
            //   justifyContent: 'flex-start',
          }
        }
        dropDownStyle={{backgroundColor: '#fafafa', zIndex: 10}}
        onChangeItem={(item) =>
          this.setState({
            country: item.value,
          })
        }
      />
    );
  }
}
