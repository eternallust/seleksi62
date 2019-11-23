import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import * as action from '../redux/actions/action';
import Header from '.././components/header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      storeName: '',
    };
  }

  searchData = async input => {
    // eslint-disable-next-line prettier/prettier
    
    await this.searchData(token, input);
  };

  goToDetailScreen = businessId => {
    this.props.navigation.navigate('Detail', businessId);
  };

  componentDidMount = async () => {
    // eslint-disable-next-line prettier/prettier
    const token ='FVkhEGKpV857Iy4UHdi9tRgqzYcUwSBtWQbbiQqr8XYYl09DuqYTTTKBIHkXiBYgZrff3uPgA5NYCoA9y3At4t8CmtRU_NH_b6eCS7W-KVNROssbvTFcFCuwr07XXXYx';
    await this.props.getData(token);
    // console.log(this.props.data.getBussinessData.businesses);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.gridContainer}>
          <View style={styles.viewGrid}>
            <FlatList
              style={styles.grid}
              numColumns={2}
              data={this.props.data.getBussinessData.businesses}
              renderItem={({item, index}) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    style={styles.containerItem}
                    onPress={() => this.goToDetailScreen(item.id)}>
                    <View style={styles.item}>
                      <View style={styles.containerImage}>
                        <Image
                          style={styles.Image}
                          source={{
                            uri: `${item.image_url}`,
                          }}
                        />
                      </View>
                      <View style={styles.textItem}>
                        <Text style={styles.desc}>{item.rating} Stars</Text>
                        <Text style={styles.desc}>
                          {item.review_count} Reviews
                        </Text>
                        <Text numberOfLines={1} style={styles.storeName}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f6fb',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  gridContainer: {
    backgroundColor: '#f0f6fb',
    height: '90%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    backgroundColor: '#f0f6fb',
    height: '50%',
    width: '95%',
  },
  viewGrid: {
    width: '100%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f6fb',
    height: Dimensions.get('window').height * 0.3,
    width: '50%',
    borderRadius: 10,
  },
  containerItem: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '95%',
    width: '95%',
  },
  item: {
    height: '90%',
    width: '90%',
  },
  textItem: {
    flexDirection: 'column-reverse',
    height: '35%',
    width: '100%',
    alignContent: 'center',
  },
  containerImage: {
    height: '65%',
    width: '100%',
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  desc: {
    marginBottom: -5,
    color: 'grey',
  },
  storeName: {
    marginBottom: -5,
    fontWeight: 'bold',
    color: '#192a56',
  },
});
const mapStateToProps = state => {
  return {
    data: state.data, // reducers/index.js
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getData: token => dispatch(action.getData(token)),
    searchData: (token, input) => dispatch(action.searchData(token, input)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
