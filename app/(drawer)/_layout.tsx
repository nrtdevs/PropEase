import { Colors } from '@/constants/Colors';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from 'react';
import { ms } from 'react-native-size-matters';

const CustomDrawerContent = (props: any) => {
  const [userType, setUserType] = useState<string | null>();

  const { theme } = useTheme();
  const getUserType = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    setUserType(parsedUserData?.userType);
  };

  useEffect(() => {
    getUserType();
  }, [])

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].cart }}>
          <DrawerItem
            icon={({ color, size }) => <MaterialCommunityIcons name="view-dashboard-edit-outline" size={ms(24)} color={Colors[theme].text} />}
            label={labels?.home}
            labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
            onPress={() => router.push('/home')}
          />
        </DrawerContentScrollView>
  )
}

const Layout = () => {
  const { theme } = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors[theme].cart,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} />

  )
}

export default Layout