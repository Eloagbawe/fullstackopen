import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data as DiaryEntry[])
}

export const createDiary = (newDiary: NewDiaryEntry) => {
  return axios
    .post(baseUrl, newDiary)
    .then((response) => response.data as DiaryEntry)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err.response
      } else {
        throw err
      }
    })
}
