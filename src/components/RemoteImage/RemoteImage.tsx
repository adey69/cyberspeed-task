import { memo } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { configurationSelector, useAppSelector } from '../../rtk';

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
    />
  );
};

export default memo(RemoteImage);
