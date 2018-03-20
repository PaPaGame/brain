const APP = "app_";

/***********************    班级相关    *****************************/
const GROUP = APP + "group_";
/** 更新班级列表*/
export const GROUP_UPDATE_LIST = GROUP + "get_update_list";

/***********************    用户相关    *****************************/
const USER = APP + "user_";
export const USER_UPDATE_INFO = USER + "update_info";

/***********************    课程相关    *****************************/
const COURSE = APP + "course_";
export const COURSE_UPDATE_INFO = COURSE + "update_info";   // 更新文章内容
export const COURSE_UPDATE_QUESTION = COURSE + "update_question";   // 更新问答内容
export const COURSE_UPDATE_QUIZ = COURSE + "update_quiz";   //更新quiz题目内容
