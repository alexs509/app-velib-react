import React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { ListItem, Button, Badge } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome';

export default class AllVelib extends React.Component {
    constructor() {
        super();
        this.state = { velib: '' }
        fav = "";
    }


    setItem(datas, datas2) {
        AsyncStorage.setItem('favorite', JSON.stringify([]));
        AsyncStorage.getItem('favorite').then((value) => {
            !value && AsyncStorage.setItem('favorite', JSON.stringify([]));
            let val = JSON.parse(value);
            val = [...val, { code: datas, name: datas2 }];
            AsyncStorage.setItem('favorite', JSON.stringify(val));
            this.forceUpdate();
        });
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
        let t = fav;
        AsyncStorage.getItem('favorite').then((value) => {
            if (value != null && value != undefined) {
                fav = JSON.parse(value)
            } else {
                fav = "non"
            }
        });

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
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Button
                                    onPress={() => {
                                        this.setItem(result.fields.station_code, result.fields.station_name);
                                    }}
                                    style={{ width: 45, flex: 1, alignItems: "flex-end" }}
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
                <Text style={styles.titre}>Favorite Liste</Text><Badge status="warning" value={<Text>{fav ? fav.length : "0" }</Text>} />
                {fav != "" &&
                    fav.map((result, i) => (
                        <ListItem
                            key={i}
                            title={result.name}
                            subtitle={result.code}
                        />
                    ))
                }
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
        fontSize: 25
    },
});
