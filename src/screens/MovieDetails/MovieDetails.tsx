import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, RemoteImage, Typography } from '../../components';
import { useMovieDetails } from './Hooks';
import styles from './styles';

const MovieDetails = () => {
  const { selectedMovie, movieActors, movieKeywords, isLoading } =
    useMovieDetails();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}>
      <RemoteImage
        style={styles.cover}
        posterPath={selectedMovie?.poster_path ?? ''}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.infoContainer}>
        <Typography style={styles.title}>{selectedMovie?.title}</Typography>
        <Typography>{selectedMovie?.overview ?? ''}</Typography>
        <Typography style={styles.actors}>
          <Typography style={styles.sectionLabel}>Actors: </Typography>

          {movieActors?.length > 0
            ? movieActors?.map(
                (actor, index, arr) =>
                  `${actor.name}${index !== arr?.length - 1 && ', '}`,
              )
            : 'N/A'}
        </Typography>
        <View style={styles.keywordsContainer}>
          <Typography style={styles.sectionLabel}>Keywords: </Typography>
          {movieKeywords?.length > 0 ? (
            movieKeywords?.map(keyword => (
              <View key={keyword} style={styles.keywordWrapper}>
                <Typography style={styles.keyword}>{keyword}</Typography>
              </View>
            ))
          ) : (
            <Typography>N/A</Typography>
          )}
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={isLoading} />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetails;
