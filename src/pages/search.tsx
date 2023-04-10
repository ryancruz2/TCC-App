import React, { useState } from 'react';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    LogBox
  } 
from 'react-native';

import { SearchBar } from '@rneui/themed';

function Search() {
    const [search, setSearch] = useState("");

    const updateSearch = (search: string) => {
        setSearch(search);
      };

      return (
        <View style={styles.view}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    view: {
      margin: 10,
    },
});

export default Search;