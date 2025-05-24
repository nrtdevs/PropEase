import { Colors } from '@/constants/Colors'
import { labels } from '@/constants/Labels'
import { useTheme } from '@/context/ThemeContext'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, Text } from 'react-native'
import { ms, vs } from 'react-native-size-matters'

const _layout = () => {
  const { theme } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: Platform.select({
        ios: {

        },
        default: {
          height: vs(45),
          backgroundColor: Colors[theme].cart,
          alignItems: "center",
          justifyContent: "center",
        },
      }),

    }}>
      <Tabs.Screen name="setting"
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text style={{ color: focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray }}>{labels?.settings}</Text>
          ),
          tabBarIcon: ({ color, focused }: any) => (
            <MaterialIcons name="dashboard" size={24} color={focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray} />
          )
        }}
      />
      <Tabs.Screen name="index"

        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text style={{ color: focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray }}>{labels?.home}</Text>
          ),
          tabBarIcon: ({ focused }: any) => (
            <Entypo name="home" size={ms(24)} color={focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray} />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout