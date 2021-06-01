import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserStatistics, getUserStatisticsBySubject } from "../../api/subjectTestsApi";

export const getAllStats = createAsyncThunk('getStats', () => getUserStatistics())
export const getStatsBySubject = createAsyncThunk('getSubjectStats', (subject) => getUserStatisticsBySubject(subject))