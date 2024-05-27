import quizAreaStore from './quiz-area-store';
import quizStoreReducer from './quiz-store';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    quizStore: quizStoreReducer,
    quizAreaStore:quizAreaStore
  },
});
