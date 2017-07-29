/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation';

import Home from './src/Home';
import Framework from './src/Framework';
import Login from './src/Login';
import SchoolWorks from './src/SchoolWorks';
import KnowledgePoint from './src/KnowledgePoint';
import KnowledgePoints from './src/KnowledgePoints';
import Webpage from './src/Webpage';
import QaList from './src/QaList';
import QaForm from './src/QaForm';
import Mistakes from './src/Mistakes';
import Explanation from './src/Explanation';
import Quiz from './src/Quiz';
import QuizShow from './src/QuizShow';

import Profile from './src/Profile';
import System from './src/profile/System';
import Avatar from './src/profile/Avatar';

const App = StackNavigator({
  Home: {screen: Home},
  SchoolWorks: {screen: SchoolWorks},
  QuizShow: {screen: QuizShow},
  KnowledgePoints: {screen: KnowledgePoints},
  KnowledgePoint: {screen: KnowledgePoint},
  Profile: {screen: Profile},
  System: {screen: System},
  Avatar: {screen: Avatar},
  Webpage: {screen: Webpage},
  QaList: {screen: QaList},
  QaForm: {screen: QaForm},
  Mistakes: {screen: Mistakes},
  Explanation: {screen: Explanation},
  Login: {screen: Login},
  Quiz: {screen: Quiz},
});
AppRegistry.registerComponent('salte_student', () => App);

//==============================================================
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null, //1000 * 3600 * 24,
  enableCache: true
})

// 对于react native
global.storage = storage;

import {Config} from './src/Config';
// global.config = new Config("http://192.168.1.31:3005");
// global.config = new Config("http://118.178.137.111");
global.config = new Config("http://101.37.78.83");
//==============================================================
