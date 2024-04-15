import { memo } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { Images } from '../../assets/images';

const RemoteImage = (props: FastImageProps) => {
  return <FastImage {...props} defaultSource={Images.moviePlaceholder} />;
};

export default memo(RemoteImage);
