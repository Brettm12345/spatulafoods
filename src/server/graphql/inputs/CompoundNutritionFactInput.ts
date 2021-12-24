import {inputObjectType} from 'nexus'
import {CompoundNutritionFact} from 'nexus-prisma'

import {MeasurementInput, NutritionFactInput} from '.'

export const CompoundNutritionFactInput = inputObjectType({
  name: 'CompoundNutritionFactInput',
  definition(t) {
    t.field(CompoundNutritionFact.ingredient)
    t.field(CompoundNutritionFact.order)
    t.field(CompoundNutritionFact.dailyValue)
    t.field('measurements', {type: MeasurementInput})
    t.list.field('ingredients', {type: NutritionFactInput})
  },
})
