import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

    return search?.map((phone: SearchInterface) => (
      <Card key={phone.id} style={styles.card}>
        <Card.Content>
          <Text>
            {`${phone.maker} ${phone.name}`}
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
    alignItems: 'center',
    backgroundColor: '#098277',
    height: '100%'
  },
  card: {
    width: "95%"
  }
});

export default Search;
