import * as React from 'react';
import { Image, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';

import categories from '../../assets/data/categories'

import styles from './styles'
import HomeCategory from '../../components/HomeCategory';

// const firstCategory = categories.items[1];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        {/* List of categories */}
        <FlatList 
        data={categories.items}
        renderItem={({item}) => (
        <HomeCategory category={item} />) }
        />
    </View>
  );
}

