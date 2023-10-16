import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import { SearchInterface } from '../interface/itf_search';
import requests from '../utils/requests';
interface Product {
  _id: number;
  Name: string;
  Image: string;
  Maker: string;
  __v: number;
  product: {
    tela: string;
    bateria: string;
  };
}

const SearchProduct = (id: number) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReadonlyArray<Product>>([]);

  const onChangeSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      if (!query) {
        setSearchResults([]);
        return;
      }
      console.log(searchQuery)
      const response = await requests.get(`/api/cadaster/CompanyPhone?id=${id}&name=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.warn(searchResults)
      setSearchResults([])
      // You could set an error state and display an error message in your UI here
    }
  };
  return (
    <View style={styles.container}>
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Procurar um aparelho"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />
    </View>
    <View style={styles.card}>{renderSearchResults(searchResults)}</View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#098277',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#098277',
  },
  searchbar: {
    borderRadius: 25,
    backgroundColor: '#f5fffa',
  },
  searchInput: {
    // Additional input styles if needed
  },
  menu: {
    marginTop: "30%"
  },
  cardMenu: {
    height: 50,
    backgroundColor: "#F5FFFA",
    borderColor: "#39E53D",
    borderWidth: 1,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  texto: {
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: "2%"
  },
  searchResultsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  card:{
    position: "absolute",
    width: "95%",
    marginTop: "17.5%",
    marginLeft: "3%"
  }
});

const renderSearchResults = (searchResults: ReadonlyArray<Product>) => {
  if (searchResults.length === 0) {
    return null;
  }

  return searchResults.map((phone: Product) => (
    <Card key={phone._id} >
      <Card.Content>
        <Text>{`${phone.Maker} ${phone.Name}`}</Text>
      </Card.Content>
    </Card>
  ));
};

export default SearchProduct;
