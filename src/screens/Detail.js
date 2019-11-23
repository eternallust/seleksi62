import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Image, Text, FlatList} from 'react-native';
import Header from '.././components/header';
import Slideshow from 'react-native-image-slider-show';
import {Rating} from 'react-native-elements';

import {connect} from 'react-redux';
import * as action from '../redux/actions/action';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      dummy: [1, 2, 3, 4, 5],
      iconRatingPrice: [],
      descRating: '',
      descPrice: '',
      ratingStar: '',
      openHour: '',
      address: [],
      closehour: '',
      dataSource: [],
    };
  }

  countRatingStar = rating => {
    let descRating = '';

    rating <= 2
      ? (descRating = 'Bad')
      : rating > 2 && rating <= 3
      ? (descRating = 'Average')
      : (descRating = 'Good');

    this.setState({
      descRating: descRating,
    });
  };

  countRatingPrice = rating => {
    let descRating = '';
    // membuat desc rating
    rating <= 2
      ? (descRating = 'Cheap')
      : rating > 2 && rating <= 3
      ? (descRating = 'Average')
      : (descRating = 'Pricey');

    this.setState({
      descPrice: descRating,
    });

    const maxRating = 5;
    let items = [];
    for (let i = 0; i < maxRating; i++) {
      i < rating
        ? items.push(
            <Image
              source={require('./../assets/dollargreen.png')}
              style={{width: 15, height: 15}}
            />,
          )
        : items.push(
            <Image
              source={require('./../assets/dollargrey.png')}
              style={{width: 15, height: 15}}
            />,
          );
    }
    this.setState({
      iconRatingPrice: [...items],
    });
  };

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }
  prevScreen = () => {
    this.props.navigation.goBack();
  };
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  componentDidMount = async () => {
    const id = this.props.navigation.state.params;
    const token =
      'FVkhEGKpV857Iy4UHdi9tRgqzYcUwSBtWQbbiQqr8XYYl09DuqYTTTKBIHkXiBYgZrff3uPgA5NYCoA9y3At4t8CmtRU_NH_b6eCS7W-KVNROssbvTFcFCuwr07XXXYx';
    await this.props.getData(token, id);
    // console.log(this.props.data.detailData.name);
    const rating = await this.props.data.detailData.rating;
    const price = await this.props.data.detailData.price;
    let photos = await this.props.data.detailData.photos;
    this.countRatingStar(rating);
    this.countRatingPrice(price.length);
    photos = photos.map(image => {
      return {
        url: image,
      };
    });
    console.log(photos);
    this.setState({
      openHour: this.props.data.detailData.hours[0].open[0].start,
      closehour: this.props.data.detailData.hours[0].open[0].end,
      address: this.props.data.detailData.location.display_address,
      dataSource: [...photos],
    });
  };
  render() {
    const [addr1, addr2] = this.state.address;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0984e3" barStyle="light-content" />
        <Header
          title={this.props.data.detailData.name}
          goBack={() => this.prevScreen()}
        />
        <View style={styles.storeDesc}>
          <View style={styles.imageSlider}>
            <Slideshow
              containerStyle={{borderRadius: 5}}
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({position})}
            />
          </View>
          <View style={styles.storeDetail}>
            <View
              style={{
                width: '95%',
                height: '80%',
              }}>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={this.props.data.detailData.rating}
              />
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {this.state.descRating}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.desc}>
          <View style={{width: '95%', height: '95%', backgroundColor: 'white'}}>
            <View style={{height: '10%'}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#192a56'}}>
                {this.props.data.detailData.name}
              </Text>
            </View>
            <View style={styles.continerDesc}>
              <View style={styles.locationStyle} />
              <Image
                source={require('./../assets/placeholder.png')}
                style={styles.icon}
              />
              <View>
                <Text style={styles.title}>Location</Text>
                <Text style={styles.infoStore}>
                  {/* {this.props.data.detailData ? addr1 : ''} */}
                  {/* {`${this.props.data.detailData.location.country}`} */}
                  {`${addr1}, ${addr2}`}
                </Text>
              </View>
            </View>
            <View style={styles.continerDesc}>
              <View style={styles.phoneStyle} />
              <Image
                source={require('./../assets/telephone.png')}
                style={styles.icon}
              />
              <View>
                <Text style={styles.title}>Phone</Text>
                <Text style={styles.infoStore}>
                  {this.props.data.detailData.display_phone}
                </Text>
              </View>
            </View>
            <View style={styles.continerDesc}>
              <View style={styles.locationStyle} />
              <Image
                source={require('./../assets/time.png')}
                style={styles.icon}
              />
              <View>
                <Text style={styles.title}>Hours</Text>
                <Text style={styles.infoStore}>{`${this.state.openHour} : ${
                  this.state.closehour
                }`}</Text>
              </View>
            </View>
            <View style={styles.rating}>
              <View style={styles.ratingDesc}>
                <Text style={{fontWeight: 'bold'}}>
                  {this.props.data.detailData.review_count}
                </Text>
                <Text>Reviews</Text>
              </View>
              <View style={styles.ratingDesc}>
                <View style={{height: '26%'}}>
                  <FlatList
                    data={this.state.iconRatingPrice}
                    horizontal={true}
                    renderItem={({item}) => <View>{item}</View>}
                  />
                </View>
                <Text>{this.state.descPrice}</Text>
              </View>
            </View>
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
  },
  storeDesc: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
  },
  imageSlider: {
    alignSelf: 'center',
    width: '95%',
    height: '70%',
  },
  storeDetail: {
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: '25%',
    backgroundColor: 'white',
  },
  desc: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: '45%',
    width: '95%',
    backgroundColor: 'white',
  },
  continerDesc: {
    alignItems: 'center',
    borderColor: '#f5f6fa',
    borderWidth: 0.5,
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  rating: {
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#f5f6fa',
    borderWidth: 0.5,
    width: '100%',
    height: '25%',
    flexDirection: 'row',
  },
  locationStyle: {
    height: '100%',
    width: '2.5%',
    backgroundColor: '#273c75',
  },
  phoneStyle: {
    height: '100%',
    width: '2.5%',
    backgroundColor: '#3498db',
  },
  timeStyle: {
    height: '100%',
    width: '2.5%',
    backgroundColor: '#16a085',
  },
  icon: {
    marginHorizontal: 5,
    height: '46%',
    width: '7%',
  },
  title: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoStore: {
    color: 'grey',
    marginLeft: 5,
    fontSize: 12,
  },
  ratingDesc: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#f5f6fa',
  },
});
const mapStateToProps = state => {
  return {
    data: state.data, // reducers/index.js
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // eslint-disable-next-line prettier/prettier
    getData: (token, businessId) => dispatch(action.detailData(token, businessId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
