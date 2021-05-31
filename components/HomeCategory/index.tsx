import * as React from 'react';
import { Image, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';

import styles from './styles'

// defing the type of props
interface HomeCategoryProps {
    // since we have sent data in category props, so we have added types inside category
    category: {
        id: string;
        title: string;
        movies: {
            id: string,
            poster: string,
        }[] // since movie is an array of objects(id,poster)
    }
}

export default function HomeCategory(props: HomeCategoryProps) {

    const {category} = props;

  return (
    <>
        <Text style={styles.title}>{category.title}</Text>
      <FlatList 
      data={category.movies}
      renderItem={({item}) => (
        <Image style={styles.image} source={{uri: item.poster}} />)}
        // horizontal scrollable
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

