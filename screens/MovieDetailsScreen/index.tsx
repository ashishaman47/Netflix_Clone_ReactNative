import React, { useState, useEffect } from 'react'
import { Image, Pressable, FlatList, ActivityIndicator } from 'react-native'
import {View, Text} from '../../components/Themed'
import {AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons'

import styles from './styles'

import movie from '../../assets/data/movies'

// importing DataStore
import {DataStore} from 'aws-amplify';
// import Model
import {Episode, Movie, Season} from '../../models';

import EpisodeItem from '../../components/EpisodeItem'
import { Picker } from '@react-native-picker/picker'
import VideoPlayer from '../../components/VideoPlayer'

// useRoute --> to get the movie id, parameter through routes --> which we clicked on home screen
import {useRoute} from '@react-navigation/native'

const firstSeason = movie.seasons.items[0]
const firstEpisode = firstSeason.episodes.items[0]

const MovieDetailsScreen = () => {

    // storing movie
    const [movie, setMovie] = useState<Movie|undefined>(undefined);

    // storing all seasons in that movie
    const [seasons, setSeasons] = useState<Season[]>([]);

    // storing episodes of current season
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    // storing the current season
    const [currentSeason, setCurrentSeason] = useState<Season|undefined>(undefined);

    // storing the current episode
    const [currentEpisode, setCurrentEpisode] = useState<Episode|undefined>(undefined);

    // storing the name of seasons by maping through each season
    const seasonNames = seasons ? seasons.map(season => season.name) : [];

    const route = useRoute();

    // fetching the movie clicked by user --> then fetching all the seasons of that movie --> then fetching all the episodes in that season
    useEffect(() => {
        const fetchMovie = async () => {
            // this is the id from route parameters
            setMovie(await DataStore.query(Movie, route?.params?.id))
        }
        fetchMovie();
    }, [])

    // fetching seasons
    useEffect(() => {  
        // if movie is null --> we don't want to do anything here --> as we need movie id to fetch seasons
        if(!movie) {
            return;
        }

        // if we have movie --> then fetch seasons
        const fetchSeasons = async () => {
            const movieSeasons = (await DataStore.query(Season)).filter(s => s.movie?.id === movie.id);

            setSeasons(movieSeasons);
            setCurrentSeason(movieSeasons[0]);
        }
        fetchSeasons();
        // fetch seasons when the movie variable changes
    }, [movie])

    // whenever we change currentSeason --> we need to fetch episodes of that season
    useEffect(() => {
        // if currentSeason is not defiend don't do anything
        if(!currentSeason) {
            return;
        }

        const fetchEpisodes = async () => {
            const seasonEpisodes = (await DataStore.query(Episode)).filter(e => e?.season?.id === currentSeason?.id)

            setEpisodes(seasonEpisodes);
            setCurrentEpisode(seasonEpisodes[0]);
        }
        fetchEpisodes();
    }, [currentSeason])

    // if movie is null --> show loading screen
    if (!movie) {
        // shows loading screen
        return <ActivityIndicator />
    }

    console.log(seasons);
    console.log(seasonNames);

    return (
        <View style={styles.container}>
            {/* if currentEpisode is there then render video player */}
            {currentEpisode && <VideoPlayer episode={currentEpisode} />}

            <FlatList 
            data={episodes}
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
            {/* if current season is not null then only render this picker */}
                {currentSeason && (
                    <Picker
                    style={{color: 'white', width: 130}}
                    dropdownIconColor='white'
                    selectedValue={currentSeason.name}
                    onValueChange={(itemValue, itemIndex) =>
                        {
                            // at position --> itemIndex
                            setCurrentSeason(seasons[itemIndex])
                        }
                    }>
                        {/* we will map through each season Name and for each name we'll render one item */}
                        {seasonNames.map(seasonName => (
                            <Picker.Item key={seasonName} label={seasonName} value={seasonName} />
                        ))}
                    </Picker>
                )}
            </View>
            )}
            />
        </View>
    )
}

export default MovieDetailsScreen
