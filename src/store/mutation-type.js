const APP = 'app_';

/** *********************    班级相关    *****************************/
const GROUP = APP + 'group_';
/** 更新班级列表*/
export const GROUP_UPDATE_LIST = GROUP + 'get_update_list';

/** *********************    用户相关    *****************************/
const USER = APP + 'user_';
export const USER_UPDATE_INFO = USER + 'update_info';
export const USER_UPDATE = USER + 'update';

/** *********************    课程相关    *****************************/
const COURSE = APP + 'course_';
export const COURSE_UPDATE_INFO = COURSE + 'update_info';   // 更新文章内容
export const COURSE_UPDATE_QUESTION = COURSE + 'update_question';   // 更新问答内容
export const COURSE_UPDATE_QUIZ = COURSE + 'update_quiz';   // 更新quiz题目内容
export const COURSE_SET_COURSE_ID = COURSE + 'set_course_id'; // 设置课程id

/** *********************    老师相关    *****************************/
const STAFF = APP + 'staff_';
export const STAFF_SCHOOL_LIST = STAFF + 'school_list';
export const STAFF_TOTAL_COUNT = STAFF + 'total_count';


/** *********************    学生相关    *****************************/
const STUDENT = APP + 'student_';
export const STUDENT_ALL_LIST = STUDENT + 'student_all_list';


/** *********************    文章相关    *****************************/
const ARTICLE = APP + 'article_';
export const ARTICLE_LEVEL_LIST = ARTICLE + 'level_list';
export const ARTICLE_LIST = ARTICLE + 'list';