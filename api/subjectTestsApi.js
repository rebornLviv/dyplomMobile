import { testAPi } from "../utils/axios";

export const getSubjects = () => testAPi.get('/subject')
export const getSubjectTests = (subjectId) => testAPi.get(`/test-wrap/subject/${subjectId}`)