import React, { Component } from 'react';
import {Image, FlatList, Text, View, StyleSheet, SafeAreaView,StatusBar} from 'react-native';

var currentPage = 1;
var data = [];

const ListFooterComponent = () => (
  <Text
    style={{
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'white',
      paddingBottom: 40,
    }}
  >
    Loading More...
  </Text>
);
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  LoadData = () => {
    fetch('http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=1')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: data.concat(json.results) });
        this.setState({currentPage: json.page});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  componentDidMount() {
    console.log('here');
    this.LoadData()
  }
  render() {
    const { data, isLoading } = this.state;
    StatusBar.setBarStyle('light-content', true);
   return (
      <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 12 ,paddingHorizontal: 12}}>
        
          <FlatList
            data={data}
            ListFooterComponent={() => isLoading && <ListFooterComponent />}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={[styles.item, {
                flexDirection: "row"
              }]}>
                <View style={{flex: 1,paddingRight: 12}}>
                  <Image
      style={{width: '100%', height:100 }}
      source={{uri: 'https://image.tmdb.org/t/p/w500/'+item.poster_path}}
    />
                </View>
                <View style={{
                flexDirection: "column",
                flex: 3,
              }}>
                <View>
                <Text style={{color: 'green',fontSize: 16}}>{item.title}</Text>
                </View>
                <View>
                <Text style={{color:'brown',fontSize: 12}}>Release Date: {item.release_date}</Text>
                </View>
                <View>
                <Text style={{color:'white'}}>{item.overview}</Text>
                </View>
                </View>
                
                
              </View>
            )}
            onEndReachedThreshold={0.01}
            onEndReached={info => {
              this.setState({ isLoading: true });
              setTimeout(() => {
                console.log(currentPage);
              currentPage= currentPage+1;
              console.log(currentPage);
              console.log(isLoading);
                fetch('http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page='+(currentPage)+'')
              .then((response) => response.json())
              .then((json) => {
                this.setState({ data: [...data,...json.results] });
                this.setState({currentPage: json.page});
              })
              .catch((error) => console.error(error))
              .finally(() => {
                this.setState({ isLoading: false });
              });
              }, 1000);
            }
          }
          />
          
          
      </View></SafeAreaView>
      
    );
  }
};

const styles = StyleSheet.create({container: {
  flex: 1,backgroundColor:'black'
},
  item:{
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 16
    
  },loading: {
    position: 'absolute',
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
