import { ImageStyle, StyleProp, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { memo } from 'react';
import { Typography } from '..';

interface IMovieCardProps {
  thumbnailStyles?: StyleProp<ImageStyle>;
}

const MovieCard = (props: IMovieCardProps) => {
  const { thumbnailStyles } = props;
  return (
    <View style={[styles.container, thumbnailStyles]}>
      <FastImage
        style={styles.thumbnail}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.bottomContainer}>
        <Typography style={styles.title}>Title</Typography>
        <Typography style={styles.category}>Category</Typography>
      </View>
    </View>
  );
};

export default memo(MovieCard);
