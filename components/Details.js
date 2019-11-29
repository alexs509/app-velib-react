import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Details extends React.Component {

  constructor(props) {
    super(props);
    state = { station_code: "", station_name: "", details: "" };
    this.getStationByCode = this.getStationByCode.bind(this);
  }

  getStationByCode(code) {
    return fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=2&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state&refine.station_code=' + code)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          details: responseJson.records,
        });
        console.log("dedans");
      })
      .catch((error) => {
        console.error(error);
      });
  }


  componentWillMount() {
    this.setState({
      station_code: this.props.navigation.getParam('station_code'),
      station_name: this.props.navigation.getParam('station_name')
    })
  }

  componentDidMount() {
    this.getStationByCode(this.state.station_code);
  }

  render() {
    let station_name = ""
    let station_code = ""
    let details = ""
    if (this.state.station_name != "" && this.state.station_code != "") {
      station_name = this.state.station_name;
      station_code = this.state.station_code;
    }
    if (this.state.details != "" && this.state.details != undefined) {
      details = this.state.details[0];
    }
    return (
      <View style={styles.container}>
        <Text>Detail de la station : {station_name != "" && station_name}</Text>
        <Text>Code de la station : {station_code != "" && station_code}</Text>
        {
          details != "" &&
          <View>
            <Text>{details.fields.station_name}</Text>
            <Text>{details.fields.nbebike}</Text>
            <Text>{details.fields.nbefreebike}</Text>
          </View>
        }
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
