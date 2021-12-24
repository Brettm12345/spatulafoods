import path from 'path'

import {makeSchema, fieldAuthorizePlugin} from 'nexus'

import {
  CompoundNutritionFactModel,
  MeasurementModel,
  DeleteFaq,
  Faqs,
  FaqModel,
  MeasurementTypeModel,
  UpdateMeasurement,
  Image,
  NutritionFactModel,
  ProductByShopifyId,
  ProductModel,
  Products,
  CreateProductInput,
  NutritionFactInput,
  CompoundNutritionFactInput,
  MeasurementInput,
  UpdateMeasurementInput,
  UpdateFaqInput,
  CreateFaqInput,
} from './graphql'
import {UpdateProductInput} from './graphql/inputs/UpdateProductInput'
import {ShopifyProductModel} from './graphql/models/ShopifyProduct'
import {CreateProduct} from './graphql/mutations'
import {CreateFaq} from './graphql/mutations/CreateFaq'
import {UpdateFaq} from './graphql/mutations/UpdateFaq'
import {UpdateProduct} from './graphql/mutations/UpdateProduct'
import {ShopifyProducts} from './graphql/queries/ShopifyProducts'

export const schema = makeSchema({
  contextType: {
    module: path.join(process.cwd(), 'src', 'server', 'context.ts'),
    alias: 'ContextModule',
    export: 'Context',
  },
  plugins: [fieldAuthorizePlugin()],
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    schema: path.join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src', 'generated', 'nexus-typegen.d.ts'),
  },
  types: [
    CompoundNutritionFactModel,
    ProductByShopifyId,
    UpdateFaqInput,
    CreateFaqInput,
    CreateFaq,
    NutritionFactInput,
    CreateProduct,
    UpdateFaq,
    UpdateMeasurementInput,
    CompoundNutritionFactInput,
    MeasurementInput,
    NutritionFactInput,
    UpdateMeasurement,
    CreateProductInput,
    FaqModel,
    Faqs,
    DeleteFaq,
    UpdateFaq,
    CreateProduct,
    Image,
    Products,
    MeasurementModel,
    MeasurementTypeModel,
    NutritionFactModel,
    ShopifyProductModel,
    ShopifyProducts,
    ProductModel,
    UpdateProductInput,
    UpdateProduct,
  ],
})
