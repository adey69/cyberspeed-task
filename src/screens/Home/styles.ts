import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackBg,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cardContainer: {
    width: Dimensions.get('screen').width / 2 - 26,
  },
  cardMargin: {
    marginRight: 8,
  },
  separator: {
    height: 16,
  },
  searchInputWrapper: {
    backgroundColor: COLORS.greyBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.borderGrey,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: COLORS.white,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
