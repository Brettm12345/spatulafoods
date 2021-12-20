import {inputObjectType} from 'nexus'
import {Product} from 'nexus-prisma'
import {CompoundNutritionFactInput, NutritionFactInput} from '.'

export const CreateProductInput = inputObjectType({
  name: 'CreateProductInput',
  definition(t) {
    t.field(Product.shopifyId)
    t.list.field('compoundNutritionFacts', {
      type: CompoundNutritionFactInput,
    })
    t.field(Product.ingredients)
    t.field(Product.cookingInstructions)
    t.field(Product.contains)
    t.list.field('nutritionFacts', {type: NutritionFactInput})
  },
})
