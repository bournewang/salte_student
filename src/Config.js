import {build_http_query} from './Helper';

class Config{
  constructor(base_url){
    this.icon_size = 28;
    this.SCHOOL_WORK_TYPE_COURSE = 1;
    this.SCHOOL_WORK_TYPE_WEEK   = 2;
    this.SCHOOL_WORK_TYPE_MONTH  = 3;
    this.SCHOOL_WORK_TYPE_TEST   = 4;

    this.token = null;
    this.api_base_url         = base_url;
    this.settings_url         = this.api_base_url + "/api_student_v1/settings";
    this.api_login            = this.api_base_url + "/api_student_v1/login";
    this.api_logout           = this.api_base_url + "/api_student_v1/logout";
    this.api_user_info        = this.api_base_url + "/api_student_v1/userinfo";
    this.api_school_works     = this.api_base_url + "/api_student_v1/school_works";
    this.api_knowledge_points = this.api_base_url + "/api_student_v1/knowledge_points";
    this.api_knowledge_point  = this.api_base_url + "/api_student_v1/knowledge_point";
    this.api_update_avatar    = this.api_base_url + "/api_student_v1/avatar";
    this.api_question_explanations     = this.api_base_url + "/api_student_v1/question_explanations";
    this.api_qa               = this.api_base_url + "/api_student_v1/qa";
    this.api_my_qas           = this.api_base_url + "/api_student_v1/my_qas";
    this.quiz_knowledge_point = this.api_base_url + "/quiz/knowledge_point";
    this.quiz_school_work     = this.api_base_url + "/quiz/school_work";
    this.quiz_question        = this.api_base_url + "/quiz/question"
    this.quiz_school_work_show= this.api_base_url + "/quiz/school_work_show";
    this.mistakes             = this.api_base_url + "/api_student_v1/mistakes";
    this.profile_chart        = this.api_base_url + "/quiz/chart";
    this.settings = {};
    this.subjects = [];
    this.school_work_types = {};
    this.school_work_groups = {};

    storage.load({
      key: 'settings',
    }).then(data => {
      this.subjects = data.subjects;
      this.school_work_types = data.school_work_types;
      this.school_work_groups = data.school_work_groups;
    });

    fetch(this.settings_url)
    .then((res) => {return res.json();})
    .then((data) => {
      this.subjects = data.subjects;
      this.school_work_types = data.school_work_types;
      this.school_work_groups = data.school_work_groups;

      storage.save({
        key: 'settings',
        data: data,
        expires: null
      });
    })
  };

  get_api_logout_url(){
    return this.api_logout      + "?" + build_http_query({token: this.token});
  }
  get_api_user_info_url(){
    return this.api_user_info   + "?" + build_http_query({token: this.token});
  }
  get_api_school_works_url(school_work_type){
    return this.api_school_works + "?" + build_http_query({token: this.token, school_work_type: school_work_type});
  }
  get_api_knowledge_points_url(subject_id, query){
    return this.api_knowledge_points + "?" + build_http_query({token: this.token, subject_id: subject_id, query: query});
  }
  get_api_knowledge_point_url(knowledge_point_id){
    return this.api_knowledge_point + "?" + build_http_query({token: this.token, knowledge_point_id: knowledge_point_id});
  }
  get_api_question_explanations_url(question_id){
    return this.api_question_explanations + "?" + build_http_query({token: this.token, question_id: question_id});
  }
  get_api_update_avatar_url(){
    return this.api_update_avatar + "?" + build_http_query({token: this.token});
  }
  get_api_my_qas_url(){
    return this.api_my_qas + "?" + build_http_query({token: this.token});
  }
  get_quiz_knowledge_point_url(knowledge_point_id){
    return this.quiz_knowledge_point + "?" + build_http_query({token: this.token, knowledge_point_id: knowledge_point_id});
  }
  get_quiz_school_work_url(school_work_id){
    return this.quiz_school_work + "?" + build_http_query({token: this.token, school_work_id: school_work_id});
  }
  get_quiz_school_work_show_url(school_work_id){
    return this.quiz_school_work_show + "?" + build_http_query({token: this.token, school_work_id: school_work_id});
  }
  get_quiz_question_url(question_id){
    return this.quiz_question + "?" + build_http_query({token: this.token, question_id: question_id});
  }
  get_mistaks_url(){
    return this.mistakes + "?" + build_http_query({token: this.token});
  }
  get_profile_chart_url(){
    return this.profile_chart + "?" + build_http_query({token: this.token});
  }
};

exports.Config = Config;
