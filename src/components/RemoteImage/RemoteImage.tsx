import { memo } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { configurationSelector, useAppSelector } from '../../rtk';
import { Images } from '../../assets/images';

interface IRemoteImageProps extends FastImageProps {
  posterPath: string;
}

const RemoteImage = (props: IRemoteImageProps) => {
  const { posterPath, ...rest } = props;
  const config = useAppSelector(configurationSelector);
  return (
    <FastImage
      {...rest}
      source={{
        uri: `${config?.secure_base_url}original${posterPath}`,
      }}
      defaultSource={Images.moviePlaceholder}
    />
  );
};

export default memo(RemoteImage);
