import {Storage} from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Movie } from '../../models';
import styles from './styles'

const MovieItem = ({movie}: {movie: Movie}) => {

    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState('');

    const onMoviePress = () => {
        console.log(movie.id);
        navigation.navigate('MovieDetailsScreen', {id: movie.id})
    }

    useEffect(()=>{
        // get the manual entry of data --> directly into tables --> where url starts with http
        if(movie.poster.startsWith('http')) {
            setImageUrl(movie.poster);
            return;
        }

        // get from storage
        Storage.get(movie.poster)
        .then(setImageUrl)
    },[])

    return (
        <Pressable onPress={onMoviePress}>
            <Image style={styles.image} source={{uri: imageUrl}} />
        </Pressable>
    )
}

export default MovieItem
