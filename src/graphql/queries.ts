import {gql} from 'urql'

import {
  COMPOUND_NUTRITION_FACT,
  FAQ,
  FULL_PRODUCT,
  NUTRITION_FACT,
  PRODUCT,
} from './fragments'

export const FAQS = gql`
  query Faqs {
    faqs {
      ...Faq
    }
  }
  ${FAQ}
`

export const SHOPIFY_PRODUCTS = gql`
  query ShopifyProducts {
    shopifyProducts {
      id
      name
      image {
        alt
        src
      }
    }
  }
`
export const PRODUCTS = gql`
  query Products {
    products {
      ...Product
    }
  }
  ${PRODUCT}
`

export const ALL_PRODUCTS = gql`
  query AllProducts {
    products {
      ...FullProduct
    }
  }
  ${FULL_PRODUCT}
`
export const PRODUCT_BY_ID = gql`
  query Product($id: Int!) {
    product: productByShopifyId(shopifyId: $id) {
      name
      nutritionFacts {
        ...NutritionFact
      }
      compoundNutritionFacts {
        ...CompoundNutritionFact
      }
    }
  }
  ${COMPOUND_NUTRITION_FACT}
  ${NUTRITION_FACT}
`
