import React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { ListItem, Button, Badge, Overlay } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome';

export default class AllVelib extends React.Component {
    constructor() {
        super();
        this.state = { velib: '', isVisible: false, msg: "" }
        fav = "";
    }

    resetFav() {
        AsyncStorage.setItem('favorite', JSON.stringify([]));
        setInterval(
            () => this.forceUpdate(),
            500
        );
    }

    setItem(datas, datas2) {
        let check = this.alreadyInFav(datas);
        if (check == true) {
            AsyncStorage.getItem('favorite').then((value) => {
                !value && AsyncStorage.setItem('favorite', JSON.stringify([]));
                let val = JSON.parse(value);
                val = [...val, { code: datas, name: datas2 }];
                AsyncStorage.setItem('favorite', JSON.stringify(val));
                setInterval(
                    () => this.forceUpdate(),
                    500
                );
                this.setState({ isVisible: true, msg: "✔️ Ajouter à vos favoris avec succés" });
            });
        } else {
            this.setState({ isVisible: true, msg: "❌ Station déja dans vos favoris ‼️" });
        }
    }

    alreadyInFav(data) {
        let bool = true;
        fav.map((result) => {
            result.code == data ? bool = false : '';
        });
        return bool;
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
                    subtitle={'Nombre de vélo dispo : ' + Number(result.fields.nbebike + result.fields.nbbike) + ' 🚴‍♂️'}
                    bottomDivider
                />
            ));
        }

        return (
            <View style={styles.container}>
                <Overlay
                 height={50}
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <Text  style={styles.overlay}>{this.state.msg}</Text>
                </Overlay>
                <Text style={styles.titre}>Favorite Liste</Text><Badge status="warning" value={<Text>{fav ? fav.length : "0"}</Text>} />
                {fav != "" &&
                    <Button
                        style={{ width: 150, alignSelf: "center" }}
                        type="clear"
                        title="Vider la liste"
                        bottomDivider
                        onPress={() => {
                            this.resetFav();
                        }}></Button>
                }
                {fav != "" &&
                    fav.map((result, i) => (
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate('Details', {
                                    station_code: result.code,
                                    station_name: result.name
                                })
                            }}
                            key={i}
                            title={result.name}
                            subtitle={result.code}
                            chevron
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
    overlay: {
        color: 'goldenrod',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
});
