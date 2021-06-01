import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSubjects, getSubjectTests } from "../../api/subjectTestsApi";


export const getAllSubjects = createAsyncThunk('getSubjects', () => getSubjects())
export const getTestsBySubject = createAsyncThunk('getTestsBySubject', (subjectId) => getSubjectTests(subjectId))