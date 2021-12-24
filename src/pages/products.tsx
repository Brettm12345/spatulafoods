import type {NextPage} from 'next'

import {ProductPage} from '../components/ProductsPage'
import {NutritionFactProvider} from '../hooks/useNutritionFacts'

const Product: NextPage = () => {
  return (
    <NutritionFactProvider items={[]}>
      <ProductPage />
    </NutritionFactProvider>
  )
}

export default Product
