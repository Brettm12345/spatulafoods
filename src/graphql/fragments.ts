import {gql} from 'urql'

export const PRODUCT = gql`
  fragment Product on Product {
    id
    name
    image {
      alt
      src
      width
      height
    }
  }
`
export const MEASUREMENTS = gql`
  fragment Measurements on Measurement {
    id
    type
    value
  }
`

export const NUTRITION_FACT = gql`
  fragment NutritionFact on NutritionFact {
    id
    ingredient
    dailyValue
    order
    measurements {
      ...Measurements
    }
  }
  ${MEASUREMENTS}
`

export const COMPOUND_NUTRITION_FACT = gql`
  fragment CompoundNutritionFact on CompoundNutritionFact {
    id
    ingredient
    dailyValue
    order
    measurements {
      ...Measurements
    }
    ingredients {
      ...NutritionFact
    }
  }
  ${NUTRITION_FACT}
  ${MEASUREMENTS}
`

export const FAQ = gql`
  fragment Faq on Faq {
    id
    question
    answer
  }
`

export const FULL_PRODUCT = gql`
  fragment FullProduct on Product {
    id
    cookingInstructions
    ingredients
    contains
    shopifyId
    nutritionFacts {
      ...NutritionFact
    }
    compoundNutritionFacts {
      ...CompoundNutritionFact
    }
    servingSize {
      ...Measurements
    }
  }
  ${MEASUREMENTS}
  ${COMPOUND_NUTRITION_FACT}
  ${NUTRITION_FACT}
`
