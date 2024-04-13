import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { Typography } from '../../components';
import { View } from 'react-native';

const MovieDetails = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FastImage
        style={styles.cover}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.infoContainer}>
        <Typography style={styles.title}>Movie Title</Typography>
        <Typography>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before the final copy is available.
        </Typography>
        <Typography style={styles.actors}>
          <Typography style={styles.sectionLabel}>Actors:</Typography> Tom
          Cruise, Morgan Freeman, Angelina Julie, Rami Malik, Dwayne Johnson
        </Typography>
        <View style={styles.keywordsContainer}>
          <Typography style={styles.sectionLabel}>Keywords: </Typography>
          {['Action', 'Adventure', 'The Rock'].map((keyword, index, arr) => (
            <View style={styles.keywordWrapper}>
              <Typography>{keyword}</Typography>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;
