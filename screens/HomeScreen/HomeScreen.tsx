import React, {useState, useEffect} from 'react';
import { Image, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';

// import categories from '../../assets/data/categories'

import { DataStore } from '@aws-amplify/datastore';
import { Category } from '../../models/index';


import styles from './styles'
import HomeCategory from '../../components/HomeCategory';

// const firstCategory = categories.items[1];

export default function HomeScreen() {

  // of type Category which is array
  const [categories, setCategories] = useState<Category[]>([]);

  // runs everytime when this screen component mounts
  useEffect(() => {
    // we are fetching data using DataStore which is syncronising automatically with Amplify --> and makes app available to use offline 
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category));
    }
    fetchCategories();
  }, [])

  return (
    <View style={styles.container}>
        {/* List of categories */}
        <FlatList 
        data={categories}
        renderItem={({item}) => (
          <HomeCategory category={item} />) }
        />
    </View>
  );
}

