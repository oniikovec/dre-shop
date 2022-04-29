import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action'
import { CATEGORIES_ACTION_TYPES } from './category.types'


export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
    yield put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategories() {
  // latest: 'if you hear a bunch of same actions, 
  // give me the latest one'
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  // all() - an effect that says run everything inside
  // and only complete when all of it is done
  yield all([call(onFetchCategories)])
}