import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Item, Input, Title, Body, Left, Icon, Right} from 'native-base';
import {connect} from 'react-redux';
import * as action from '../redux/actions/action';
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  searchData = () => {
    const token =
      'FVkhEGKpV857Iy4UHdi9tRgqzYcUwSBtWQbbiQqr8XYYl09DuqYTTTKBIHkXiBYgZrff3uPgA5NYCoA9y3At4t8CmtRU_NH_b6eCS7W-KVNROssbvTFcFCuwr07XXXYx';
    this.props.searchData(token, this.state.input);
  };
  searchBar = () => {
    return (
      <Header searchBar style={{backgroundColor: '#0984e3'}}>
        <Item regular style={styles.form}>
          <Input
            onChangeText={text => this.setState({input: text})}
            style={styles.input}
            placeholderTextColor="white"
            placeholder="Search"
          />
          <Icon
            onPress={() => this.searchData()}
            name="search"
            style={{color: 'white'}}
          />
        </Item>
      </Header>
    );
  };

  headerDesc = title => {
    return (
      <Header style={{backgroundColor: '#0984e3'}}>
        <Left>
          <TouchableOpacity onPress={this.props.goBack}>
            <Icon name="arrow-back" style={{color: 'white'}} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  };

  render() {
    return (
      <View>
        {this.props.title == null
          ? this.searchBar()
          : this.headerDesc(this.props.title)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  form: {
    height: '70%',
    borderRadius: 5,
    backgroundColor: '#273c75',
    borderColor: '#273c75',
  },
});
const mapStateToProps = state => {
  return {
    data: state.data, // reducers/index.js
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchData: (token, input) => dispatch(action.searchData(token, input)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(header);
