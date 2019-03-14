import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import titleCase from 'title-case';

class Detail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('contact').name,
        headerStyle: {
            backgroundColor: '#2a3daa',
        },
        headerTintColor: 'white',

    })
    
    render() {

        contact = this.props.navigation.getParam('contact');

        const source = contact.picture;
        const imageStyle = {
            height: 200,
            width: 200,
        };
        
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={imageStyle} source={{uri: source}}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{contact.name} is {titleCase(contact.gender)}.</Text>
                    <Text style={styles.text}>{contact.gender === "male" ? "He" : "She"} lives at {contact.address}.</Text>
                    <Text style={styles.text}>{contact.gender === "male" ? "He" : "She"} works at {contact.company}.</Text>
                    <Text style={styles.text}>{contact.gender === "male" ? "His" : "Her"} favourite film is {contact.filmName}.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    
    imageContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        
      },

    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },

    text: {
        fontSize: 18,
        marginVertical: 5,

    }
    
});

export default Detail;