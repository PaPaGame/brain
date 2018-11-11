import ajax from '@/utils/ajax';

const course = {
  fetchAllCourse(query) {
    return ajax({
      url: '/course/get',
      method: 'post',
      params: query
    });
  },
  answerTai(query) {
    return ajax({
      url: '/course/tai',
      method: 'post',
      params: query
    });
  },
  answerQuiz(query) {
    return ajax({
      url: '/course/quiz',
      method: 'post',
      params: query
    });
  },
  postRecord(data) {
    return ajax({
      url: '/course/record',
      method: 'post',
      params: data
    });
  }
};

export default course;