import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ICompany, SearchInterface } from '../interface/itf_search';
import requests from "../utils/requests";
import { useNavigation, useRoute } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import SearchProduct from './BarSearch';


function MenuSearchLoad() {
  const navigation = useNavigation();
  return (
    <><View style={styles.listGroup}>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Phones')}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Todos os Celulares</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}><AntDesign name="right" size={24} color="black" /></Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Companies')}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Todas as Empresas</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}><AntDesign name="right" size={24} color="black" /></Text>
        </View>
      </TouchableOpacity>
    </View></>
  );
}

export function Phones({ navigation }: any) {
  const [data, setData] = useState<SearchInterface[] | undefined | null>([]);

  const getPhones = async (): Promise<void> => {
    const response = (await requests.get(`/api/mobile/phones/all`)).data as SearchInterface[];
    setData(response);
  };

  useEffect(() => {
    getPhones();
  }, []);

  const renderItem = ({ item }: { item: SearchInterface }) => (
    <View style={stylesRender.card}>
      <View style={stylesRender.cardContent}>
        <View style={stylesRender.imageContainer}>
          <Image source={{ uri: item.Image }} style={stylesRender.image} />
        </View>
        <View style={stylesRender.textContainer}>
          <Text style={stylesRender.text}>
            {item.Maker} {item.Name}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onEndReachedThreshold={0.1}
      onEndReached={getPhones} // This will load more data when scrolling to the end
    />
  );
}

export function Companies() {
  const navigation = useNavigation();
  const [data, setData] = useState<ICompany[] | undefined | null>([]);
  const getCompanies = async (): Promise<void> => {
    const response = (await requests.get('/api/cadaster/Company/all')).data as ICompany[];
    setData(response);
  };
  useEffect(() => {
    getCompanies();
  }, []);

  const renderItem = ({ item }: { item: ICompany }) => (
    <TouchableOpacity style={stylesRender.card} id={item._id} onPress={() => navigation.navigate("PageCompany", { id: item._id, fantasy: item.nameFantasy })}>
      <View style={stylesRender.cardContent}>
        <View style={stylesRender.textContainer}>
          <Text style={stylesRender.text}>
            {item.nameFantasy}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onEndReachedThreshold={0.1}
      onEndReached={getCompanies} // This will load more data when scrolling to the end
    />
  );
}

interface IRating {
  _id: number;
  countAvaliacoes: number;
  nota: number;
}

export function PageCompany() {
  const route = useRoute() as unknown as { params: { id: number, fantasy: string } };
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  // Function to fetch the rating
  const getRating = async () => {
    try {
      const response = (await requests.get(`/api/cadaster/Company/Avaliacao?id=${route.params!.id}`)).data as IRating;
      setRating(response.nota);
      setCount(response.countAvaliacoes)
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const putRating = async (newRating: number) => {
    console.log(rating)
    const response = (await requests.put(`/api/cadaster/Company/Avaliacao?id=${route.params!.id}&nota=${newRating}`)).data as IRating;
    setRating(response.nota);
    setCount(response.countAvaliacoes)
  }
  const onStarRatingPress = (newRating: number) => {
    putRating(newRating);
  };

  return (
    <View style={stylesRender.body}>
      <View style={stylesCompany.card}>
        <View style={stylesCompany.cardBody}>
          <Text style={stylesCompany.cardTitle}>{route.params.fantasy}</Text>
          <Text style={stylesCompany.cardText}>
            Avaliação: {rating} total: {count}
          </Text>
          <View >
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={'gold'}
              selectedStar={(rating: number) => onStarRatingPress(rating)}
            />
          </View>
        </View>
      </View>
        {SearchProduct(route.params.id)}
    </View>
  );
}

function MenuSearch() {
  return (
    <MenuSearchLoad />
  );
}

const stylesCompany = StyleSheet.create({
  card: {
    width: '100%', // You can adjust the width as needed
    backgroundColor: '#096D82',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  listGroup: {
    paddingTop: 20,
    marginTop: 50
  },
  listItem: {
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#39E53D',
    borderRadius: 10,
    marginTop: 20,
    height: 70
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#098277',
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    marginTop: 5
  },
});

const stylesRender = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#098277',
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7FFF62',
    backgroundColor: '#098277'
  },
  cardContent: {
    flexDirection: 'row',
    borderColor: 'black'
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
})

export default MenuSearch;
