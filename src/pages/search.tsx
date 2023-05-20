import React, { useState } from 'react';

import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    LogBox
  } 
from 'react-native';
import { Searchbar } from 'react-native-paper';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return ( <View style={styles.body} >
              <Searchbar placeholder="Procurar um aparelho" onChangeText={onChangeSearch} value={searchQuery} style={styles.search} />
          </View> );
    
}

const styles = StyleSheet.create({
    search: {
        borderRadius: 25,
        marginTop: "5%",
        marginLeft: "2%",
        marginRight: "2%",
        height: "auto",
        backgroundColor: "#f5fffa"
    },
    body:{
      backgroundColor: '#BFEFFF',
      height: '100%'
    }
});

export default Search;