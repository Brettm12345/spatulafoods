import {inputObjectType} from 'nexus'

import {CompoundNutritionFactInput, NutritionFactInput} from '.'

export const UpdateNutritionInput = inputObjectType({
  name: 'UpdateNutritionInput',
  definition(t) {
    t.list.field('compoundNutritionFacts', {
      type: CompoundNutritionFactInput,
    })
    t.list.field('nutritionFacts', {type: NutritionFactInput})
  },
})
