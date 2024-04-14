import { memo } from 'react';
import {
  View,
  ActivityIndicator as Indicator,
  ActivityIndicatorProps,
} from 'react-native';
import styles from './styles';
import { COLORS } from '../../theme';

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <Indicator {...props} size={'large'} color={COLORS.white} />
    </View>
  );
};

export default memo(ActivityIndicator);
