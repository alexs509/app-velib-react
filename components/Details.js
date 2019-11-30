import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { AnimatedRegion, Animated, Marker } from 'react-native-maps';

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
      <React.Fragment>
        <View style={{ flex: 1 }}>
          {details != "" &&
            <View style={{ flex: 1 }}>
              <MapView style={styles.map}
                initialRegion={{
                  latitude: details.fields.geo[0],
                  longitude: details.fields.geo[1],
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: details.fields.geo[0],
                    longitude: details.fields.geo[1],
                  }}
                  title={details.fields.station_name}
                  description={details.fields.station_name}
                />
              </MapView>
            </View>
          }

          <View style={styles.container}>
            <Text style={styles.titre}>{station_name != "" && station_name}</Text>
            <Text style={styles.center}>Code de la station : <Text style={styles.bold}>{station_code != "" && station_code}</Text></Text>
            {
              details != "" &&
              <View style={styles.text}>
                <Text>🚴‍♂️ - Nombre de vélo mécanique : <Text style={styles.bold}>{details.fields.nbbike}</Text> </Text>
                <Text>🚴‍♀️ - Nombre vélo électrique : <Text style={styles.bold}>{details.fields.nbebike}</Text> </Text>
                <Text>🔓 - Nmbre de bornes disponibles : <Text style={styles.bold}>{details.fields.nbfreedock}/{details.fields.nbedock}</Text> </Text>
                <Text>🔢 - Nombre vélo en PARK+ : <Text style={styles.bold}>{details.fields.nbbikeoverflow}/{details.fields.maxbikeoverflow}</Text> </Text>
                <Text>💳 - Achat possible en station (CB) : <Text style={styles.bold}>{details.fields.creditcard == "yes" ? "oui" : "non"}</Text> </Text>
              </View>
            }
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titre: {
    fontWeight: 'bold',
    color: 'goldenrod',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    top: 25,
    left: 50,
  },
  bold: {
    fontWeight: 'bold',
    color: 'goldenrod',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
