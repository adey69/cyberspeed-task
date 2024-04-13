import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyBg,
    borderRadius: 8,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
  },
  bottomContainer: {
    padding: 8,
  },
});
