import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class AllVelib extends React.Component {
    constructor() {
        super();
        this.state = { velib: '' }
    }

    componentDidMount() {
        return fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=20')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    velib: responseJson.records,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { velib } = this.state;
        let geo = "";
        if (velib) {
            geo = velib.map((result, i) => (
                <ListItem
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            station_code: result.fields.station_code,
                            station_name: result.fields.station_name
                        })
                    }}
                    key={i}
                    title={i + '- ' + result.fields.station_name}
                    subtitle={'Nombre de vélo dispo : ' + result.fields.nbebike.toString() + ' 🚴‍♂️'}
                    bottomDivider
                    chevron
                />
            ));
        }

        return (
            <View style={styles.container}>
                <Text style={styles.titre}>Liste des velib</Text>
                {velib != "" ? geo : <Text>Chargement en cours</Text>}
            </View>
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
      fontSize:25
    },
  });
  