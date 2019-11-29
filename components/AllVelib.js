import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome';

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
                    title={
                        <View >
                    <Text>{i + '- ' + result.fields.station_name}</Text>
                    <View style={{flex:1, alignItems:"flex-end"}}>
                    <Button
                        style={{width:45,flex:1, alignItems:"flex-end"}}
                            type="clear"
                            icon={
                              <Icon
                                name="heart-o"
                                size={25}
                                color="red"
                              />
                            }
                          /></View></View>}
                    subtitle={'Nombre de vélo dispo : ' + result.fields.nbebike.toString() + ' 🚴‍♂️'}
                    bottomDivider
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
  