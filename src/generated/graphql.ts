import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CompoundNutritionFact = {
  __typename?: 'CompoundNutritionFact';
  id: Scalars['Int'];
  ingredient: Scalars['String'];
  ingredients: Array<NutritionFact>;
  measurements: Measurement;
  product: Product;
};

export type CompoundNutritionFactInput = {
  ingredient: Scalars['String'];
  ingredients?: InputMaybe<Array<InputMaybe<NutritionFactInput>>>;
  measurements?: InputMaybe<MeasurementInput>;
};

export type CreateFaqInput = {
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type CreateProductInput = {
  compoundNutritionFacts?: InputMaybe<Array<InputMaybe<CompoundNutritionFactInput>>>;
  contains: Array<Scalars['String']>;
  cookingInstructions: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  nutritionFacts?: InputMaybe<Array<InputMaybe<NutritionFactInput>>>;
  shopifyId: Scalars['Int'];
};

export type Faq = {
  __typename?: 'Faq';
  answer: Scalars['String'];
  id: Scalars['Int'];
  question: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Float']>;
  product_id?: Maybe<Scalars['Int']>;
  src?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  variant_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width?: Maybe<Scalars['Float']>;
};

export type Measurement = {
  __typename?: 'Measurement';
  id: Scalars['Int'];
  type: MeasurementType;
  value: Scalars['Float'];
};

export type MeasurementInput = {
  type: MeasurementType;
  value: Scalars['Float'];
};

export enum MeasurementType {
  Grams = 'GRAMS',
  Millagrams = 'MILLAGRAMS',
  Units = 'UNITS'
}

export type Mutation = {
  __typename?: 'Mutation';
  create_product?: Maybe<Product>;
  createFaq?: Maybe<Faq>;
  deleteFaq?: Maybe<Faq>;
  updateFaq?: Maybe<Faq>;
  updateMeasurement?: Maybe<Measurement>;
};


export type MutationCreate_ProductArgs = {
  input?: InputMaybe<CreateProductInput>;
};


export type MutationCreateFaqArgs = {
  data?: InputMaybe<CreateFaqInput>;
};


export type MutationDeleteFaqArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateFaqArgs = {
  data?: InputMaybe<UpdateFaqInput>;
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateMeasurementArgs = {
  id?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<UpdateMeasurementInput>;
};

export type NutritionFact = {
  __typename?: 'NutritionFact';
  id: Scalars['Int'];
  ingredient: Scalars['String'];
  measurements: Measurement;
  product: Product;
};

export type NutritionFactInput = {
  ingredient: Scalars['String'];
  measurements?: InputMaybe<MeasurementInput>;
};

export type Product = {
  __typename?: 'Product';
  compoundNutritionFacts: Array<CompoundNutritionFact>;
  cookingInstructions: Scalars['String'];
  id: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  nutritionFacts: Array<NutritionFact>;
  shopifyId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  faqs?: Maybe<Array<Maybe<Faq>>>;
  productByShopifyId?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
};


export type QueryProductByShopifyIdArgs = {
  shopifyId?: InputMaybe<Scalars['Int']>;
};

export type UpdateFaqInput = {
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type UpdateMeasurementInput = {
  type: MeasurementType;
  value: Scalars['Float'];
};

export type DeleteFaqMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type DeleteFaqMutation = { __typename?: 'Mutation', deleteFaq?: { __typename?: 'Faq', id: number, question: string, answer: string } | null | undefined };

export type UpdateFaqMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  data: UpdateFaqInput;
}>;


export type UpdateFaqMutation = { __typename?: 'Mutation', updateFaq?: { __typename?: 'Faq', id: number, question: string, answer: string } | null | undefined };

export type CreateFaqMutationVariables = Exact<{
  data?: InputMaybe<CreateFaqInput>;
}>;


export type CreateFaqMutation = { __typename?: 'Mutation', createFaq?: { __typename?: 'Faq', id: number, question: string, answer: string } | null | undefined };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', shopifyId: number } | null | undefined> | null | undefined };

export type FaqsQueryVariables = Exact<{ [key: string]: never; }>;


export type FaqsQuery = { __typename?: 'Query', faqs?: Array<{ __typename?: 'Faq', id: number, question: string, answer: string } | null | undefined> | null | undefined };


export const DeleteFaqDocument = gql`
    mutation DeleteFaq($id: Int) {
  deleteFaq(id: $id) {
    id
    question
    answer
  }
}
    `;

export function useDeleteFaqMutation() {
  return Urql.useMutation<DeleteFaqMutation, DeleteFaqMutationVariables>(DeleteFaqDocument);
};
export const UpdateFaqDocument = gql`
    mutation UpdateFaq($id: Int, $data: UpdateFaqInput!) {
  updateFaq(id: $id, data: $data) {
    id
    question
    answer
  }
}
    `;

export function useUpdateFaqMutation() {
  return Urql.useMutation<UpdateFaqMutation, UpdateFaqMutationVariables>(UpdateFaqDocument);
};
export const CreateFaqDocument = gql`
    mutation CreateFaq($data: CreateFaqInput) {
  createFaq(data: $data) {
    id
    question
    answer
  }
}
    `;

export function useCreateFaqMutation() {
  return Urql.useMutation<CreateFaqMutation, CreateFaqMutationVariables>(CreateFaqDocument);
};
export const ProductsDocument = gql`
    query Products {
  products {
    shopifyId
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const FaqsDocument = gql`
    query Faqs {
  faqs {
    id
    question
    answer
  }
}
    `;

export function useFaqsQuery(options: Omit<Urql.UseQueryArgs<FaqsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FaqsQuery>({ query: FaqsDocument, ...options });
};