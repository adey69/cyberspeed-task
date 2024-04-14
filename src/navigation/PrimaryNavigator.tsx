import { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MovieDetails } from '../screens';
import { COLORS } from '../theme';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator<PrimaryStackParamsList>();

const PrimaryNavigator = () => {
  const navigation = useNavigation();

  const renderHeaderLeft = useCallback(
    () => (
      <TouchableOpacity
        style={styles.backContainer}
        onPress={navigation.goBack}>
        <Image source={Images.back} style={styles.backIcon} />
      </TouchableOpacity>
    ),
    [],
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.blackBg,
        },
        headerTitleStyle: {
          color: COLORS.white,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerLeft: renderHeaderLeft,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});

export default PrimaryNavigator;
