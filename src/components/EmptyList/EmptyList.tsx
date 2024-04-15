import { View } from 'react-native';
import { Typography } from '..';
import { memo } from 'react';
import styles from './styles';

interface IEmptyListProps {
  text: string;
}

const EmptyList = ({ text }: IEmptyListProps) => {
  return (
    <View style={styles.container}>
      <Typography>{text}</Typography>
    </View>
  );
};

export default memo(EmptyList);
