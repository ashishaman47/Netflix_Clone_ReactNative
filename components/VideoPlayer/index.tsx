import {Storage} from 'aws-amplify';
import { Video } from 'expo-av';
import { Playback } from 'expo-av/build/AV';
import { unloadAsync } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Episode } from '../../types'
import styles from './styles';

// defining types of videoPlayerProps
interface VideoPlayerProps {
    episode: Episode
}

const VideoPlayer = (props: VideoPlayerProps) => {

    const {episode} = props;

    const video = useRef<Playback>(null);
    const [videoURL, setVideoURL] = useState('');

    // keep track of video status
    const [status, setStatus] = useState({});

    useEffect(()=>{
        if(episode.video.startsWith('http')) {
            setVideoURL(episode.video)
            return;
        }

        Storage.get(episode.video)
        .then(setVideoURL)
    },[episode])


    useEffect(()=>{
        // whenever episode changes --> load current video --> which we'll call right away

        if(!video) {
            return;
        }

        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                {uri: videoURL},
                {},
                false,
            );
        })();

    }, [videoURL])

    // console.log(episode);

    if(videoURL === '') {
        return null;
    }

    return (
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: videoURL,
                }}
                
                // adding poster img over video
                posterSource={{
                    uri: episode.poster,
                }}
                posterStyle={{
                    resizeMode: 'cover',
                }}
                usePoster={false}

                useNativeControls
                resizeMode="contain"
                // isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

export default VideoPlayer
