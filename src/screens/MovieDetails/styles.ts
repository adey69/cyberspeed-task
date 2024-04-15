import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackBg,
  },
  scrollContainer: {
    paddingBottom: 20,
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
  reviewHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  reviewContainer: {
    marginBottom: 12,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAuthor: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  reviewDate: {
    fontSize: 10,
    color: COLORS.borderGrey,
  },
  reviewContent: {
    fontSize: 10,
    marginVertical: 8,
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlLabel: {
    fontSize: 10,
  },
  reviewLink: {
    textDecorationLine: 'underline',
    fontSize: 10,
  },
});
