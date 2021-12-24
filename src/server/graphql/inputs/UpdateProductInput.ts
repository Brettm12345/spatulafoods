import {inputObjectType} from 'nexus'
import {Product} from 'nexus-prisma'

export const UpdateProductInput = inputObjectType({
  name: 'UpdateProductInput',
  definition(t) {
    t.list.field('compoundNutritionFacts', {type: 'CompoundNutritionFactInput'})
    t.field(Product.ingredients)
    t.field(Product.contains)
    t.field(Product.cookingInstructions)
    t.list.field('nutritionFacts', {type: 'NutritionFactInput'})
    t.field('servingSize', {type: 'MeasurementInput'})
  },
})
