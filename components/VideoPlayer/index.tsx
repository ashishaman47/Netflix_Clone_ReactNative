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

    // keep track of video status
    const [status, setStatus] = useState({});

    useEffect(()=>{
        // whenever episode changes --> load current video --> which we'll call right away

        if(!video) {
            return;
        }

        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                {uri: episode.video},
                {},
                false,
            );
        })();

    }, [episode])

    console.log(episode);

    return (
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: episode.video,
                }}
                
                // adding poster img over video
                posterSource={{
                    uri: episode.poster,
                }}
                posterStyle={{
                    resizeMode: 'cover',
                }}
                usePoster={true}

                useNativeControls
                resizeMode="contain"
                // isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

export default VideoPlayer
