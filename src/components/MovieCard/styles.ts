import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyBg,
    borderRadius: 8,
    height: 260,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    marginTop: 4,
  },
  bottomContainer: {
    padding: 8,
  },
  genresContainer: {
    flexDirection: 'row',
  },
});
