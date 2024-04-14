import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { ActivityIndicator, MovieCard } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../assets/images';
import { APP_TEXT } from '../../strings';
import { COLORS } from '../../theme';
import { useHome } from './Hooks';

const Home = () => {
  const { isLoading, config, genres, randomMovies, handleMovieSelection } =
    useHome();

  const renderItem = ({ item, index }: ListRenderItemInfo<IMovie>) => {
    return (
      <TouchableOpacity
        onPress={() => handleMovieSelection(item)}
        style={[styles.cardContainer, index % 2 === 0 && styles.cardMargin]}>
        <MovieCard movie={item} />
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputWrapper}>
        <Image source={Images.search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={APP_TEXT.searchHere}
          placeholderTextColor={COLORS.white}
        />
      </View>
      <FlatList
        extraData={[config, genres]}
        data={randomMovies ?? []}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
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
