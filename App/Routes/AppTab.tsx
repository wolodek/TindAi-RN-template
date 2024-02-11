/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@Components/Home/Home';
import Search from '@Components/Search/Search';
import Users from '@Components/User/User';
import SettingsStack from '@Routes/SettingsStack';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext';
import ThemeColor from '@Theme/Colors';

const Tab = createBottomTabNavigator();

enum tabs {
  HomeTab = 'Home',
  SearchTab = 'Search',
  UsersTab = 'Users',
  SettingsTab = 'Settings',
}

const AppTab = () => {
  const { appTheme, translations } = useContext(AppContext);
  const TABS = [
    {
      title: tabs.HomeTab,
      icon: AppImages.home,
      screen: Home,
      name: translations.HOME,
    },
    {
      title: tabs.SearchTab,
      icon: AppImages.search,
      screen: Search,
      name: 'search',
    },
    {
      title: tabs.UsersTab,
      icon: AppImages.user,
      screen: Users,
      name: 'user',
    },
    {
      title: tabs.SettingsTab,
      icon: AppImages.settings,
      screen: SettingsStack,
      name: 'setting',
    },
  ];
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: ThemeColor.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: appTheme.background,
      }}>
      {TABS.map(tab => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.screen}
            options={(): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                tabBarIcon: ({ focused, size }) => (
                  <Image
                    resizeMode="contain"
                    source={{ uri: tab.icon }}
                    style={{
                      height: size,
                      width: size,
                      tintColor:
                        (focused && appTheme.themeColor) || appTheme.lightText,
                    }}
                  />
                ),
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { AppTab };
