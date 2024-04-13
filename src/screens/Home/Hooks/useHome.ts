import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    navigation.navigate('MovieDetails');
  };

  return {
    navigateToDetails,
  };
};
