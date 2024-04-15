import {
  FlatList,
  Image,
  ListRenderItemInfo,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, EmptyList, MovieCard } from '../../components';
import { Images } from '../../assets/images';
import { APP_TEXT } from '../../strings';
import { COLORS } from '../../theme';
import { useHome, useSearching } from './Hooks';
import styles from './styles';
import { useCallback } from 'react';

const Home = () => {
  const {
    searchInput,
    moviesToShow,
    searching,
    handleSearchInput,
    clearSearch,
  } = useSearching();
  const { isLoading, config, genres, handleMovieSelection } = useHome({
    searching,
  });

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IMovie>) => {
      return (
        <TouchableOpacity
          onPress={() => handleMovieSelection(item)}
          style={[styles.cardContainer, index % 2 === 0 && styles.cardMargin]}>
          <MovieCard movie={item} />
        </TouchableOpacity>
      );
    },
    [],
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const renderEmptyList = useCallback(() => {
    return <EmptyList text={APP_TEXT.noMoviesToShow} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputWrapper}>
        <Image source={Images.search} style={styles.searchIcon} />
        <TextInput
          value={searchInput}
          onChangeText={handleSearchInput}
          style={styles.searchInput}
          placeholder={APP_TEXT.searchHere}
          placeholderTextColor={COLORS.white}
        />
        {searchInput?.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Image source={Images.close} style={styles.searchIcon} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id.toString()}
        extraData={[config, genres]}
        data={moviesToShow ?? []}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyList}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={isLoading} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
