import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function TabsContainer() {
    const [activeTab, setActiveTab] = useState(1);
  
    const handleTabPress = (tabIndex: React.SetStateAction<number>) => {
      setActiveTab(tabIndex);
    };
  
    return (
      <View style={styles.container}>
  <View style={styles.tabs}>
    <TouchableOpacity onPress={() => handleTabPress(1)} style={[styles.tab, activeTab === 1 && styles.activeTab]} >
      <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Todos</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTabPress(2)} style={[styles.tab, activeTab === 2 && styles.activeTab]}>
      <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>Favoritos</Text>
    </TouchableOpacity>
  </View>
</View>

    );
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: "5%",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    tabs: {
      flexDirection: 'row',
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 99,
      padding: 12, // Use pixel values instead of 'rem'
      shadowColor: 'rgba(24, 94, 224, 0.15)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 3,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      fontSize: 14, // Use pixel values for font size
      color: 'black',
      fontWeight: '500', // Use string values for fontWeight
      borderRadius: 99,
      cursor: 'pointer', // Cursor is not applicable in React Native
    },
    activeTab: {
      backgroundColor: '#185ee0',
    },
    tabText: {
      fontSize: 14, // Use pixel values for font size
      color: 'black',
    },
    activeTabText: {
      color: '#fff',
    },
    // glider: {
    //   position: 'absolute',
    //   height: 30,
    //   width: '33.33%', // Use string values for percentages
    //   backgroundColor: '#e6eef9',
    //   zIndex: 1,
    //   borderRadius: 99,
    //   transition: '0.25s ease-out', // Transition is not directly supported; consider using Animated API
    // },
  });
  
  
  export default TabsContainer;