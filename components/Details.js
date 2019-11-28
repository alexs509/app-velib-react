import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Details extends React.Component {

  constructor(props) {
    super(props);
    state = { station_code: "", station_name: "", details: ""};
  }

  componentWillMount() {
    this.setState({ 
      station_code: this.props.navigation.getParam('station_code'), 
      station_name: this.props.navigation.getParam('station_name')
    })
  }

  render() {
    let station_name = ""
    if(this.state.station_name != "") {
      station_name = this.state.station_name;
  }
    return (
      <View style={styles.container}>
        <Text>Detail de la station : { station_name != "" && station_name}</Text>
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
