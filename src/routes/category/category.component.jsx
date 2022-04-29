import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'
import ProductCard from '../../components/product-card/product-card.component'
import { CategoryContainer, CategoryTitle } from './category.styles'

const Category = () => {

  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  // this scrolls to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // we need a 'safe guard' in case the products is empty, 
  // which it is because categoriesMap runs async
  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => 
              <ProductCard key={product.id} product={product} />
          )}
        </CategoryContainer>
      )}
    </Fragment>
  )
}

export default Category