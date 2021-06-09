import React, {Component} from 'react';
import {Text, View, TextInput, Platform} from 'react-native';
import NumberFormat from 'react-number-format';

import PropTypes from 'prop-types';

import DropDownPicker from 'react-native-dropdown-picker';
import Label from '../Label';
import styles from './styles';
import Colors from '../../theme/Colors';

export default class TextAndInput extends Component {
  static propTypes = {
    data: PropTypes.array,
    dropdown: PropTypes.bool,
    highlight: PropTypes.bool,
    label: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    dropdown: false,
    label: undefined,
    highlight: false,
  };

  state = {
    value: '',
  };

  getHighlightColor() {
    const {label, signal} = this.props;
    const {value} = this.state;
    let bgColor = 'red';
    if (label === 'Pairs') {
      bgColor = Colors.green;
    } else if (label === 'Signal') {
      if (
        value === 'Buy at Market' ||
        value === 'Buy Limit' ||
        value === 'Buy Stop'
      ) {
        bgColor = Colors.green;
      }
    } else if (label === 'Status') {
      if (value === 'StopLoss') {
        bgColor = 'red';
      } else {
        bgColor = Colors.green;
      }
    }
    return bgColor;
  }

  getValue = () => {
    return this.state.value;
  };

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  onChangeDropDownItem = (item) => {
    this.setState({
      value: item.value,
    });
  };

  onChangeText = (value) => {
    let text = value;
    if (value.length <= 1) {
      text = value.slice(0, 1) + '.' + value.slice(1);
    }

    this.setState({value: text});
  };

  renderLabel() {
    const {label} = this.props;
    return <Label label={label} />;
  }
  renderInput() {
    const {value} = this.state;
    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={this.onChangeText}
        keyboardType={'number-pad'}
        maxLength={6}
      />
    );
  }

  renderDropDown() {
    const {data, dropdownPlaceholder, highlight} = this.props;
    if (highlight) {
      return (
        <View
          style={[
            styles.highlight,
            {backgroundColor: this.getHighlightColor()},
          ]}>
          <Text style={styles.highlightText}>{this.state.value}</Text>
        </View>
      );
    }
    return (
      <DropDownPicker
        items={data}
        defaultValue={this.state.value}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownMain}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropDownStyle}
        onChangeItem={this.onChangeDropDownItem}
        placeholder={dropdownPlaceholder}
      />
    );
  }

  render() {
    const {dropdown, style, label} = this.props;
    const zIndex = Platform.OS !== 'android' && (style || styles.zIndex);
    return (
      <View style={[styles.container, zIndex]}>
        {label && this.renderLabel()}
        {dropdown ? this.renderDropDown() : this.renderInput()}
      </View>
    );
  }
}
