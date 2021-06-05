import React, {useState, useEffect} from 'react';
import { Image, FlatList, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';

import styles from './styles'
import {useNavigation} from '@react-navigation/native'

import { Category, Movie } from '../../models';
import { DataStore } from 'aws-amplify';

import {Storage} from 'aws-amplify';
import MovieItem from '../MovieItem';

// defing the type of props
interface HomeCategoryProps {
    // since we have sent data in category props, so we have added types inside category
    category: Category,
}

export default function HomeCategory(props: HomeCategoryProps) {

    const {category} = props;

    // stores the movies --> having type of Movie array --> that we'll import from model
    const [movies, setMovies] = useState<Movie[]>([]);

    // useEffect --> to fetch movies for the categories
    useEffect(()=>{
      const fetchMovies = async () => {
        // we'll keep only movies that are in this category
        const result = (await DataStore.query(Movie))
                        .filter((movie) => movie.categoryID === category.id)
        
        console.log(result);
        setMovies(result);
      }

      fetchMovies();
    },[])
    

    // list storage
    // Storage.list('')
    // .then(result => console.log(result))

  return (
    <>
        <Text style={styles.title}>{category.title}</Text>
      <FlatList 
      data={movies}
      renderItem={({item}) => (
        <MovieItem movie={item} />
        )}
        // horizontal scrollable
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

