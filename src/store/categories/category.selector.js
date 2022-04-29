import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => state.categories

// this is a memoized selector. the only time this selector gets runned
// is when when the categoriesSlice is different. so if the state.categories
// is the same in the memory (tripple equals) its enough not to re-render
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

// this says: As long as the categories array does not change
// do not re-run this method
export const selectCategoriesMap = createSelector(
  [selectCategories], 
  (categories) => 
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items;

      return acc
  }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)