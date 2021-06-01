import { axios, testAPi } from "../utils/axios";

export const getSubjects = () => testAPi.get('/subject')
export const getSubjectTests = (subjectId) => testAPi.get(`/test-wrap/subject/${subjectId}`)
export const sendUserStatistics = (data) => axios.post('/statistic', data)
export const getUserStatistics = () => axios.get('/statistic')
export const getUserStatisticsBySubject = (subject) => axios.get(`/statistic/${subject}`)