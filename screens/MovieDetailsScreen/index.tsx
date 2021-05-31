import React, { useState } from 'react'
import { Image, Pressable, FlatList } from 'react-native'
import {View, Text} from '../../components/Themed'
import {AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons'

import styles from './styles'
import movie from '../../assets/data/movies'
import EpisodeItem from '../../components/EpisodeItem'
import { Picker } from '@react-native-picker/picker'
import VideoPlayer from '../../components/VideoPlayer'

const firstSeason = movie.seasons.items[0]
const firstEpisode = firstSeason.episodes.items[0]

const MovieDetailsScreen = () => {

    // storing the name of seasons by maping through each season
    const seasonNames = movie.seasons.items.map(season => season.name);

    // storing the current season
    const [currentSeason, setCurrentSeason] = useState(firstSeason);

    // storing the current episode
    const [currentEpisode, setCurrentEpisode] = useState(firstEpisode);

    return (
        <View style={styles.container}>
            <VideoPlayer episode={currentEpisode} />

            <FlatList 
            data={currentSeason.episodes.items}
            renderItem={({item}) => (
                // we need to setCurrentEpisode --> whenever we click on any episode from list
                <EpisodeItem episode={item} onPress={setCurrentEpisode} />
            )}
            // adding header component with list 
            ListHeaderComponent={(
                <View style={{padding: 12}}>
                    <Text style={styles.title}>{movie.title}</Text>
                    
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.match}>98% match</Text>
                        <Text style={styles.year}>{movie.year}</Text>
                        <View style={styles.ageContainer}>
                            <Text style={styles.age}>12+</Text>
                        </View>
                        <Text style={styles.year}>{movie.numberOfSeasons} Seasons</Text>
                        <MaterialIcons name='hd' size={24} color='white' />
                    </View>
            

            {/* Play Button */}
            <Pressable 
            style={styles.playButton}
            onPress={()=> {console.warn('Play')}}>
                <Text style={styles.playButtonText}>
                    <Entypo name='controller-play' size={18} />
                    Play
                </Text>
            </Pressable>

            {/* Download Button */}
            <Pressable 
            style={styles.downloadButton}
            onPress={()=> {console.warn('Download')}}>
                <Text style={styles.downloadButtonText}>
                    <AntDesign name='download' size={18} />
                    {' '}
                    Download
                </Text>
            </Pressable>

            {/* display movie plot */}
            <Text style={{marginVertical: 10}}>{movie.plot}</Text>
            <Text style={styles.year}>Cast : {movie.cast}</Text>
            <Text style={styles.year}>Creator: {movie.creator}</Text>

            {/* Row with icon buttons */}
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{alignItems: 'center', marginHorizontal: 20}}>
                    <AntDesign name='plus' size={24} color={'white'} />
                    <Text style={{color: 'darkgrey', marginTop: 5}}>My List</Text>
                </View>

                <View style={{alignItems: 'center', marginHorizontal: 20}}>
                    <Feather name='thumbs-up' size={24} color={'white'} />
                    <Text style={{color: 'darkgrey', marginTop: 5}}>Like</Text>
                </View>

                <View style={{alignItems: 'center', marginHorizontal: 20}}>
                    <FontAwesome name='send-o' size={24} color={'white'} />
                    <Text style={{color: 'darkgrey', marginTop: 5}}>Share</Text>
                </View>
            </View>

            {/* Season Picker using --> expo picker */}
            <Picker
            style={{color: 'white', width: 130}}
            dropdownIconColor='white'
            selectedValue={currentSeason.name}
            onValueChange={(itemValue, itemIndex) =>
                {
                    // at position --> itemIndex
                    setCurrentSeason(movie.seasons.items[itemIndex])
                }
            }>
                {/* we will map through each season Name and for each name we'll render one item */}
                {seasonNames.map(seasonName => (
                    <Picker.Item key={seasonName} label={seasonName} value={seasonName} />
                ))}
            </Picker>

            </View>
            )}
            />
        </View>
    )
}

export default MovieDetailsScreen
