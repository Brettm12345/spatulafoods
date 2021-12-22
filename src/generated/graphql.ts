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
  id: Scalars['Int']
  ingredient: Scalars['String']
  ingredients: Array<NutritionFact>
  measurements: Measurement
  product: Product
}

export type CompoundNutritionFactInput = {
  ingredient: Scalars['String']
  ingredients: Array<NutritionFactInput>
  measurements: MeasurementInput
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
  create_product: Product
  createFaq: Faq
  deleteFaq: Faq
  updateFaq: Faq
  updateMeasurement: Measurement
}

export type MutationCreate_ProductArgs = {
  input: CreateProductInput
}

export type MutationCreateFaqArgs = {
  data: CreateFaqInput
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

export type NutritionFact = {
  id: Scalars['Int']
  ingredient: Scalars['String']
  measurements: Measurement
  product: Product
}

export type NutritionFactInput = {
  ingredient: Scalars['String']
  measurements: MeasurementInput
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
}

export type QueryProductByShopifyIdArgs = {
  shopifyId: Scalars['Int']
}

export type UpdateFaqInput = {
  answer: Scalars['String']
  question: Scalars['String']
}

export type UpdateMeasurementInput = {
  type: MeasurementType
  value: Scalars['Float']
}

export type FaqFragment = {id: number; question: string; answer: string}

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

export const FaqFragmentDoc = gql`
  fragment Faq on Faq {
    id
    question
    answer
  }
`
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
