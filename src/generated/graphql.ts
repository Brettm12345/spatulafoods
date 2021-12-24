import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CompoundNutritionFact = {
  dailyValue?: Maybe<Scalars['Float']>
  id: Scalars['Int']
  ingredient: Scalars['String']
  ingredients: Array<NutritionFact>
  measurements: Measurement
  order: Scalars['Int']
  product: Product
}

export type CompoundNutritionFactInput = {
  dailyValue?: InputMaybe<Scalars['Float']>
  ingredient: Scalars['String']
  ingredients: Array<NutritionFactInput>
  measurements: MeasurementInput
  order: Scalars['Int']
}

export type CreateFaqInput = {
  answer: Scalars['String']
  id?: InputMaybe<Scalars['Int']>
  question: Scalars['String']
}

export type CreateProductInput = {
  compoundNutritionFacts: Array<CompoundNutritionFactInput>
  contains: Scalars['String']
  cookingInstructions: Scalars['String']
  ingredients: Scalars['String']
  nutritionFacts: Array<NutritionFactInput>
  servingSize: MeasurementInput
  shopifyId: Scalars['Float']
}

export type Faq = {
  answer: Scalars['String']
  id: Scalars['Int']
  question: Scalars['String']
}

export type Image = {
  alt?: Maybe<Scalars['String']>
  created_at: Scalars['String']
  height: Scalars['Float']
  id: Scalars['Int']
  position: Scalars['Float']
  product_id: Scalars['Int']
  src: Scalars['String']
  updated_at: Scalars['String']
  variant_ids: Array<Scalars['Int']>
  width: Scalars['Float']
}

export type Measurement = {
  id: Scalars['Int']
  type: MeasurementType
  value: Scalars['Float']
}

export type MeasurementInput = {
  type: MeasurementType
  value: Scalars['Float']
}

export enum MeasurementType {
  Grams = 'GRAMS',
  Millagrams = 'MILLAGRAMS',
  Units = 'UNITS',
}

export type Mutation = {
  createFaq: Faq
  createProduct: Product
  deleteFaq: Faq
  updateFaq: Faq
  updateMeasurement: Measurement
  updateProduct: Product
}

export type MutationCreateFaqArgs = {
  data: CreateFaqInput
}

export type MutationCreateProductArgs = {
  data: CreateProductInput
}

export type MutationDeleteFaqArgs = {
  id: Scalars['Int']
}

export type MutationUpdateFaqArgs = {
  data: UpdateFaqInput
  id: Scalars['Int']
}

export type MutationUpdateMeasurementArgs = {
  id: Scalars['Int']
  set: UpdateMeasurementInput
}

export type MutationUpdateProductArgs = {
  data: UpdateProductInput
  id: Scalars['Int']
}

export type NutritionFact = {
  dailyValue?: Maybe<Scalars['Float']>
  id: Scalars['Int']
  ingredient: Scalars['String']
  measurements: Measurement
  order: Scalars['Int']
  product: Product
}

export type NutritionFactInput = {
  dailyValue?: InputMaybe<Scalars['Float']>
  ingredient: Scalars['String']
  measurements: MeasurementInput
  order: Scalars['Int']
}

export type Product = {
  compoundNutritionFacts: Array<CompoundNutritionFact>
  contains: Scalars['String']
  cookingInstructions: Scalars['String']
  id: Scalars['Int']
  image: Image
  ingredients: Scalars['String']
  name: Scalars['String']
  nutritionFacts: Array<NutritionFact>
  servingSize: Measurement
  shopifyId: Scalars['Float']
}

export type Query = {
  faqs: Array<Faq>
  productByShopifyId: Product
  products: Array<Product>
  shopifyProducts: Array<ShopifyProduct>
}

export type QueryProductByShopifyIdArgs = {
  shopifyId: Scalars['Float']
}

export type ShopifyProduct = {
  id: Scalars['Float']
  image: Image
  name: Scalars['String']
}

export type UpdateFaqInput = {
  answer: Scalars['String']
  question: Scalars['String']
}

export type UpdateMeasurementInput = {
  type: MeasurementType
  value: Scalars['Float']
}

export type UpdateProductInput = {
  compoundNutritionFacts: Array<CompoundNutritionFactInput>
  contains: Scalars['String']
  cookingInstructions: Scalars['String']
  ingredients: Scalars['String']
  nutritionFacts: Array<NutritionFactInput>
  servingSize: MeasurementInput
}

export type ProductFragment = {
  id: number
  name: string
  image: {
    alt?: string | null | undefined
    src: string
    width: number
    height: number
  }
}

export type MeasurementsFragment = {
  id: number
  type: MeasurementType
  value: number
}

export type NutritionFactFragment = {
  id: number
  ingredient: string
  dailyValue?: number | null | undefined
  order: number
  measurements: {id: number; type: MeasurementType; value: number}
}

export type CompoundNutritionFactFragment = {
  id: number
  ingredient: string
  dailyValue?: number | null | undefined
  order: number
  measurements: {id: number; type: MeasurementType; value: number}
  ingredients: Array<{
    id: number
    ingredient: string
    dailyValue?: number | null | undefined
    order: number
    measurements: {id: number; type: MeasurementType; value: number}
  }>
}

export type FaqFragment = {id: number; question: string; answer: string}

export type FullProductFragment = {
  id: number
  cookingInstructions: string
  ingredients: string
  contains: string
  shopifyId: number
  nutritionFacts: Array<{
    id: number
    ingredient: string
    dailyValue?: number | null | undefined
    order: number
    measurements: {id: number; type: MeasurementType; value: number}
  }>
  compoundNutritionFacts: Array<{
    order: number
    id: number
    ingredient: string
    dailyValue?: number | null | undefined
    measurements: {id: number; type: MeasurementType; value: number}
    ingredients: Array<{
      id: number
      ingredient: string
      dailyValue?: number | null | undefined
      order: number
      measurements: {id: number; type: MeasurementType; value: number}
    }>
  }>
  servingSize: {id: number; type: MeasurementType; value: number}
}

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput
}>

export type CreateProductMutation = {createProduct: {id: number}}

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int']
  data: UpdateProductInput
}>

export type UpdateProductMutation = {updateProduct: {id: number}}

export type DeleteFaqMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteFaqMutation = {
  deleteFaq: {id: number; question: string; answer: string}
}

export type UpdateFaqMutationVariables = Exact<{
  id: Scalars['Int']
  data: UpdateFaqInput
}>

export type UpdateFaqMutation = {
  updateFaq: {id: number; question: string; answer: string}
}

export type CreateFaqMutationVariables = Exact<{
  data: CreateFaqInput
}>

export type CreateFaqMutation = {
  createFaq: {id: number; question: string; answer: string}
}

export type FaqsQueryVariables = Exact<{[key: string]: never}>

export type FaqsQuery = {
  faqs: Array<{id: number; question: string; answer: string}>
}

export type ShopifyProductsQueryVariables = Exact<{[key: string]: never}>

export type ShopifyProductsQuery = {
  shopifyProducts: Array<{
    id: number
    name: string
    image: {alt?: string | null | undefined; src: string}
  }>
}

export type ProductsQueryVariables = Exact<{[key: string]: never}>

export type ProductsQuery = {
  products: Array<{
    id: number
    name: string
    image: {
      alt?: string | null | undefined
      src: string
      width: number
      height: number
    }
  }>
}

export type AllProductsQueryVariables = Exact<{[key: string]: never}>

export type AllProductsQuery = {
  products: Array<{
    id: number
    cookingInstructions: string
    ingredients: string
    contains: string
    shopifyId: number
    nutritionFacts: Array<{
      id: number
      ingredient: string
      dailyValue?: number | null | undefined
      order: number
      measurements: {id: number; type: MeasurementType; value: number}
    }>
    compoundNutritionFacts: Array<{
      order: number
      id: number
      ingredient: string
      dailyValue?: number | null | undefined
      measurements: {id: number; type: MeasurementType; value: number}
      ingredients: Array<{
        id: number
        ingredient: string
        dailyValue?: number | null | undefined
        order: number
        measurements: {id: number; type: MeasurementType; value: number}
      }>
    }>
    servingSize: {id: number; type: MeasurementType; value: number}
  }>
}

export type ProductQueryVariables = Exact<{
  id: Scalars['Float']
}>

export type ProductQuery = {
  product: {
    name: string
    nutritionFacts: Array<{
      id: number
      ingredient: string
      dailyValue?: number | null | undefined
      order: number
      measurements: {id: number; type: MeasurementType; value: number}
    }>
    compoundNutritionFacts: Array<{
      id: number
      ingredient: string
      dailyValue?: number | null | undefined
      order: number
      measurements: {id: number; type: MeasurementType; value: number}
      ingredients: Array<{
        id: number
        ingredient: string
        dailyValue?: number | null | undefined
        order: number
        measurements: {id: number; type: MeasurementType; value: number}
      }>
    }>
  }
}

export const ProductFragmentDoc = gql`
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
export const FaqFragmentDoc = gql`
  fragment Faq on Faq {
    id
    question
    answer
  }
`
export const MeasurementsFragmentDoc = gql`
  fragment Measurements on Measurement {
    id
    type
    value
  }
`
export const NutritionFactFragmentDoc = gql`
  fragment NutritionFact on NutritionFact {
    id
    ingredient
    dailyValue
    order
    measurements {
      ...Measurements
    }
  }
  ${MeasurementsFragmentDoc}
`
export const CompoundNutritionFactFragmentDoc = gql`
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
  ${MeasurementsFragmentDoc}
  ${NutritionFactFragmentDoc}
`
export const FullProductFragmentDoc = gql`
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
      order
    }
    servingSize {
      ...Measurements
    }
  }
  ${NutritionFactFragmentDoc}
  ${CompoundNutritionFactFragmentDoc}
  ${MeasurementsFragmentDoc}
`
export const CreateProductDocument = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
    }
  }
`

export function useCreateProductMutation() {
  return Urql.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument)
}
export const UpdateProductDocument = gql`
  mutation UpdateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
    }
  }
`

export function useUpdateProductMutation() {
  return Urql.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument)
}
export const DeleteFaqDocument = gql`
  mutation DeleteFaq($id: Int!) {
    deleteFaq(id: $id) {
      ...Faq
    }
  }
  ${FaqFragmentDoc}
`

export function useDeleteFaqMutation() {
  return Urql.useMutation<DeleteFaqMutation, DeleteFaqMutationVariables>(
    DeleteFaqDocument
  )
}
export const UpdateFaqDocument = gql`
  mutation UpdateFaq($id: Int!, $data: UpdateFaqInput!) {
    updateFaq(id: $id, data: $data) {
      ...Faq
    }
  }
  ${FaqFragmentDoc}
`

export function useUpdateFaqMutation() {
  return Urql.useMutation<UpdateFaqMutation, UpdateFaqMutationVariables>(
    UpdateFaqDocument
  )
}
export const CreateFaqDocument = gql`
  mutation CreateFaq($data: CreateFaqInput!) {
    createFaq(data: $data) {
      ...Faq
    }
  }
  ${FaqFragmentDoc}
`

export function useCreateFaqMutation() {
  return Urql.useMutation<CreateFaqMutation, CreateFaqMutationVariables>(
    CreateFaqDocument
  )
}
export const FaqsDocument = gql`
  query Faqs {
    faqs {
      ...Faq
    }
  }
  ${FaqFragmentDoc}
`

export function useFaqsQuery(
  options: Omit<Urql.UseQueryArgs<FaqsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<FaqsQuery>({query: FaqsDocument, ...options})
}
export const ShopifyProductsDocument = gql`
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

export function useShopifyProductsQuery(
  options: Omit<Urql.UseQueryArgs<ShopifyProductsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<ShopifyProductsQuery>({
    query: ShopifyProductsDocument,
    ...options,
  })
}
export const ProductsDocument = gql`
  query Products {
    products {
      ...Product
    }
  }
  ${ProductFragmentDoc}
`

export function useProductsQuery(
  options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<ProductsQuery>({query: ProductsDocument, ...options})
}
export const AllProductsDocument = gql`
  query AllProducts {
    products {
      ...FullProduct
    }
  }
  ${FullProductFragmentDoc}
`

export function useAllProductsQuery(
  options: Omit<Urql.UseQueryArgs<AllProductsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<AllProductsQuery>({
    query: AllProductsDocument,
    ...options,
  })
}
export const ProductDocument = gql`
  query Product($id: Float!) {
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
  ${NutritionFactFragmentDoc}
  ${CompoundNutritionFactFragmentDoc}
`

export function useProductQuery(
  options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<ProductQuery>({query: ProductDocument, ...options})
}
