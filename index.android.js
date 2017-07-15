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
// import VideoPlayer from './src/VideoPlayer';

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

//==============================================================
var Helper = {
  createNew: function(){
    return {
      build_http_query: function(params){
        var esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
      },
      upload_image: function(url, params){
        let formData = new FormData();
        for (var key in params){
          formData.append(key, params[key]);
        }
        let file = {uri: params.path, type: 'application/octet-stream', name: 'image'};
        formData.append("image", file);

        return fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
          body: formData,
        });
      }
    };

  }
}
global.helper = Helper.createNew();

var TaiseConfig = {
　　　　createNew: function(){
　　　　　　var config = {};
          config.icon_size = 28;
          config.SCHOOL_WORK_TYPE_COURSE = 1;
          config.SCHOOL_WORK_TYPE_WEEK   = 2;
          config.SCHOOL_WORK_TYPE_MONTH  = 3;
          config.SCHOOL_WORK_TYPE_TEST   = 4;

          this.token = null;
　　　　　　config.api_base_url         = "http://118.178.137.111"; // staging
          // config.api_base_url         = "http://101.37.78.83";    // production
          // config.api_base_url         = "http://192.168.1.31:3005"; // development
          config.settings_url         = config.api_base_url + "/api_student_v1/settings";
          config.api_login            = config.api_base_url + "/api_student_v1/login";
          config.api_logout           = config.api_base_url + "/api_student_v1/logout";
          config.api_user_info        = config.api_base_url + "/api_student_v1/userinfo";
　　　　　　config.api_school_works     = config.api_base_url + "/api_student_v1/school_works";
          config.api_knowledge_points = config.api_base_url + "/api_student_v1/knowledge_points";
          config.api_knowledge_point  = config.api_base_url + "/api_student_v1/knowledge_point";
          config.api_update_avatar    = config.api_base_url + "/api_student_v1/avatar";
          config.api_question_explanations     = config.api_base_url + "/api_student_v1/question_explanations";
          config.api_qa               = config.api_base_url + "/api_student_v1/qa";
          config.api_my_qas           = config.api_base_url + "/api_student_v1/my_qas";
          config.quiz_knowledge_point = config.api_base_url + "/quiz/knowledge_point";
          config.quiz_school_work     = config.api_base_url + "/quiz/school_work";
          config.quiz_question        = config.api_base_url + "/quiz/question"
          config.quiz_school_work_show= config.api_base_url + "/quiz/school_work_show";
          config.mistakes             = config.api_base_url + "/api_student_v1/mistakes";
          config.profile_chart        = config.api_base_url + "/quiz/chart";
          config.settings = {};
          config.subjects = [];
          config.school_work_types = {};
          config.school_work_groups = {};
          config.init = function(){
            storage.load({
              key: 'settings',
            }).then(data => {
              config.subjects = data.subjects;
              config.school_work_types = data.school_work_types;
              config.school_work_groups = data.school_work_groups;
            });

            fetch(this.settings_url)
            .then((res) => {return res.json();})
            .then((data) => {
              config.subjects = data.subjects;
              config.school_work_types = data.school_work_types;
              config.school_work_groups = data.school_work_groups;

              storage.save({
                key: 'settings',
                data: data,
                expires: null
              });
            })
          };

          config.get_api_logout_url            = function(){
            return this.api_logout      + "?" + helper.build_http_query({token: this.token});
          }
          config.get_api_user_info_url         = function(){
            return this.api_user_info   + "?" + helper.build_http_query({token: this.token});
          }
          config.get_api_school_works_url      =function(school_work_type){
            return this.api_school_works + "?" + helper.build_http_query({token: this.token, school_work_type: school_work_type});
          }
          config.get_api_knowledge_points_url  = function(subject_id, query){
            return this.api_knowledge_points + "?" + helper.build_http_query({token: this.token, subject_id: subject_id, query: query});
          }
          config.get_api_knowledge_point_url   = function(knowledge_point_id){
            return this.api_knowledge_point + "?" + helper.build_http_query({token: this.token, knowledge_point_id: knowledge_point_id});
          }
          config.get_api_question_explanations_url = function(question_id){
            return this.api_question_explanations + "?" + helper.build_http_query({token: this.token, question_id: question_id});
          }
          config.get_api_update_avatar_url     = function(){
            return config.api_update_avatar + "?" + helper.build_http_query({token: this.token});
          }
          config.get_api_my_qas_url            = function(){
            return config.api_my_qas + "?" + helper.build_http_query({token: this.token});
          }
          config.get_quiz_knowledge_point_url  = function(knowledge_point_id){
            return this.quiz_knowledge_point + "?" + helper.build_http_query({token: this.token, knowledge_point_id: knowledge_point_id});
          }
          config.get_quiz_school_work_url      = function(school_work_id){
            return this.quiz_school_work + "?" + helper.build_http_query({token: this.token, school_work_id: school_work_id});
          }
          config.get_quiz_school_work_show_url = function(school_work_id){
            return this.quiz_school_work_show + "?" + helper.build_http_query({token: this.token, school_work_id: school_work_id});
          }
          config.get_quiz_question_url      = function(question_id){
            return this.quiz_question + "?" + helper.build_http_query({token: this.token, question_id: question_id});
          }
          config.get_mistaks_url               = function(){
            return this.mistakes + "?" + helper.build_http_query({token: this.token});
          }
          config.get_profile_chart_url         = function(){
            return this.profile_chart + "?" + helper.build_http_query({token: this.token});
          }


　　　　　　return config;
　　　　}
　　};
global.config = TaiseConfig.createNew();
config.init();

//==============================================================
