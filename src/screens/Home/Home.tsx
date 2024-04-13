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
import { MovieCard } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../assets/images';
import { APP_TEXT } from '../../strings';
import { COLORS } from '../../theme';
import { useHome } from './Hooks';

const Home = () => {
  const { navigateToDetails } = useHome();

  const renderItem = ({ index }: ListRenderItemInfo<number>) => {
    return (
      <TouchableOpacity
        onPress={navigateToDetails}
        style={[styles.cardContainer, index % 2 === 0 && styles.cardMargin]}>
        <MovieCard />
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
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

export default Home;
