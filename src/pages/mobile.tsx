import React, { useEffect, useState } from "react";
import requests from "../utils/requests";
import { SearchInterface } from "../interface/itf_search";
import { Card, Title } from "react-native-paper";
import { StyleSheet, Text, View, Image } from 'react-native';

function ListPhones(): JSX.Element {
  const [phones, setPhones] = useState<SearchInterface[] | undefined | null>();

  const getPhones = async (): Promise<void> => {
    const response = (await requests.get(`/api/mobile/phones?`)).data as SearchInterface[];
    setPhones(response);
  };

  const renderCards = (values: SearchInterface[] | undefined | null): JSX.Element[] => {
    if (!values) {
      return []; // Return an empty array if `values` is `undefined` or `null`
    }
  
    return values.map((phone: SearchInterface) => (
      <Card key={phone._id} style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image source={{uri: phone.Image}} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {phone.Maker} {phone.Name}
            </Text>
          </View>
        </Card.Content>
      </Card>
    ));
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <View style={styles.body}>
      <Title style={styles.title}>Olá, User</Title>
      {renderCards(phones)}
    </View>
  );
}

const styles =  StyleSheet.create({
  title: {
    textAlign: "left",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    marginTop: "3%"
  },
  body: {
    flex: 1,
    backgroundColor: '#098277',
    alignItems: 'center',
  },
  card: {
    marginTop: 10, // Add margin top of 10 pixels to the card
    width: '90%',
  },
  cardContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListPhones;
