import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackBg,
  },
  cover: {
    width: Dimensions.get('screen').width,
    height: 250,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  sectionLabel: {
    fontWeight: 'bold',
  },
  actors: {
    marginVertical: 16,
  },
  keywordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  keywordWrapper: {
    backgroundColor: '#ccb42d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  keyword: {
    textTransform: 'capitalize',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
