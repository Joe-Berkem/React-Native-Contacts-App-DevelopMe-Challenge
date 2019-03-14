import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            fetchingData: false,
          }

        this.renderItem = this.renderItem.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.onPress = this.onPress.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.refreshData = this.refreshData.bind(this);
        
    }
    
    static navigationOptions = {
        title: 'Contacts',
        headerStyle: {
            backgroundColor: '#2a3daa',
        },
        headerTintColor: 'white',
    }

    renderItem({item}) {
        return <TouchableHighlight 
            onPress={ () => this.onPress(item)} 
            style={styles.listItem} 
            underlayColor='#e4e4e4'
            >
                <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableHighlight>;
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    renderSeparator() {
        const style = { height: 1, backgroundColor: '#ddd', marginLeft: 10 };
        return <View style={style} />;
    }

    onPress(item) {
        this.props.navigation.navigate('Detail', {
            contact: item
        });
    }

    refreshData() {
        this.setState({fetchingData: true});
        this.fetchData()
      }

    fetchData() {
        let promise = axios.get("https://robocontacts.herokuapp.com/api/contacts?random");
    
        promise.then(response => {
          this.setState({contacts: response.data, fetchingData: false});
        })
    } 

    render() {
        return <FlatList 
            onRefresh={this.refreshData} 
            refreshing={false} 
            data={this.state.contacts} 
            renderItem={this.renderItem} 
            keyExtractor={this.keyExtractor} 
            ItemSeparatorComponent={this.renderSeparator}
            />;
    }

    componentDidMount() {
        this.fetchData()
    }  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItem: {
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    listItemText: {
        fontSize: 18,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    }
});

export default List;