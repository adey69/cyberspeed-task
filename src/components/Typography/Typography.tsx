import { memo } from 'react';
import { Text, TextProps } from 'react-native';
import styles from './styles';

const Typography = (props: TextProps) => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

export default memo(Typography);
