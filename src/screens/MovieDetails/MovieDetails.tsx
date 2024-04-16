import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  EmptyList,
  ErrorModal,
  RemoteImage,
  Typography,
} from '../../components';
import { useMovieDetails } from './Hooks';
import styles from './styles';
import { APP_TEXT } from '../../strings';

const MovieDetails = () => {
  const {
    selectedMovie,
    movieActors,
    movieKeywords,
    movieReviews,
    isLoading,
    errorMessage,
    showErrorModal,
    setShowErrorModal,
    handleLinkPress,
    formatDate,
  } = useMovieDetails();

  const renderReviewItem = useCallback(
    ({ item }: ListRenderItemInfo<IReview>) => (
      <View style={styles.reviewContainer}>
        <View style={styles.reviewTopRow}>
          <Typography style={styles.reviewAuthor}>{item?.author}</Typography>
          <Typography style={styles.reviewDate}>
            {formatDate(item?.updated_at)}
          </Typography>
        </View>
        <Typography style={styles.reviewContent} numberOfLines={4}>
          {item?.content}
        </Typography>
        <View style={styles.urlContainer}>
          <Typography style={styles.urlLabel} numberOfLines={1}>
            {APP_TEXT.url}:{' '}
          </Typography>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleLinkPress(item?.url)}>
            <Typography style={styles.reviewLink}>{item?.url}</Typography>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );
  const renderReviewHeader = useCallback(
    () => (
      <Typography style={styles.reviewHeader}>{APP_TEXT.reviews}</Typography>
    ),
    [],
  );

  const renderEmptyReviews = useCallback(() => {
    return <EmptyList text={APP_TEXT.noReview} />;
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}>
      <RemoteImage
        style={styles.cover}
        source={{ uri: selectedMovie?.poster_path ?? '' }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.infoContainer}>
        <Typography style={styles.title}>{selectedMovie?.title}</Typography>
        <Typography>{selectedMovie?.overview ?? ''}</Typography>
        <Typography style={styles.actors}>
          <Typography style={styles.sectionLabel}>
            {APP_TEXT.actors}:{' '}
          </Typography>

          {movieActors?.length > 0
            ? movieActors?.map(
                (actor, index, arr) =>
                  `${actor.name}${index !== arr?.length - 1 && ', '}`,
              )
            : APP_TEXT.na}
        </Typography>
        <View style={styles.keywordsContainer}>
          <Typography style={styles.sectionLabel}>
            {APP_TEXT.keywords}:{' '}
          </Typography>
          {movieKeywords?.length > 0 ? (
            movieKeywords?.map(keyword => (
              <View key={keyword} style={styles.keywordWrapper}>
                <Typography style={styles.keyword}>{keyword}</Typography>
              </View>
            ))
          ) : (
            <Typography>{APP_TEXT.na}</Typography>
          )}
        </View>
        <FlatList
          ListEmptyComponent={renderEmptyReviews}
          ListHeaderComponent={renderReviewHeader}
          data={movieReviews}
          renderItem={renderReviewItem}
          scrollEnabled={false}
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={isLoading} />
        </View>
      )}
      <ErrorModal
        message={errorMessage?.message ?? ''}
        visible={showErrorModal}
        setModalVisible={setShowErrorModal}
      />
    </ScrollView>
  );
};

export default MovieDetails;
