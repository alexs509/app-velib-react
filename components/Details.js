import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Details extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam('station_code'))
    //.log(this.props.state.param);
  }
  render() {
    return (
      <View style={styles.container}>
       <Text>Detail de la station :</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
