import { ImageStyle, StyleProp, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { memo } from 'react';
import { RemoteImage, Typography } from '..';

interface IMovieCardProps {
  movie: IMovie;
  thumbnailStyles?: StyleProp<ImageStyle>;
}

const MovieCard = (props: IMovieCardProps) => {
  const { movie, thumbnailStyles } = props;
  return (
    <View style={[styles.container, thumbnailStyles]}>
      <RemoteImage
        style={styles.thumbnail}
        posterPath={movie.poster_path}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.bottomContainer}>
        <Typography style={styles.title} numberOfLines={2}>
          {movie.title}
        </Typography>
        <Typography style={styles.category} numberOfLines={2}>
          {movie?.genres?.map((genre, index, arr) => (
            <Typography key={genre}>
              {genre}
              {index !== arr?.length - 1 && ', '}
            </Typography>
          ))}
        </Typography>
      </View>
    </View>
  );
};

export default memo(MovieCard);
