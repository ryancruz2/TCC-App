import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, LogBox, Text } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import { SearchInterface } from '../interface/itf_search';
import requests from '../utils/requests';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState<ReadonlyArray<SearchInterface>>([]);

  const onChangeSearch = async (query: string) => {
    setSearchQuery(query);

    if (query !== '' && query !== undefined) {
      try {
        const response = await requests.get(`/Phones/Search?search=${query}`);
        setSearch(response.data);
        console.log(query);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchQuery('');
      setSearch([]);
    }
  };

  const cardFormat = (search?: ReadonlyArray<SearchInterface>) => {
    if (!searchQuery || searchQuery.trim() === '') {
      return null;
    }

    return search.map((phone: SearchInterface) => (
      <Card key={phone.id}>
        <Card.Content>
          <Text>
            Nome: {phone.name}
          </Text>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <View style={styles.body}>
      <Searchbar
        placeholder="Procurar um aparelho"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      {cardFormat(search)}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    borderRadius: 25,
    marginTop: '5%',
    marginLeft: '2%',
    marginRight: '2%',
    height: 'auto',
    backgroundColor: '#f5fffa'
  },
  body: {
    backgroundColor: '#BFEFFF',
    height: '100%'
  }
});

export default Search;
