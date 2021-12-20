import {inputObjectType} from 'nexus'
import {NutritionFact} from 'nexus-prisma'
import {MeasurementInput} from '.'

export const NutritionFactInput = inputObjectType({
  name: 'NutritionFactInput',
  definition(t) {
    t.field('measurements', {type: MeasurementInput})
    t.field(NutritionFact.ingredient)
  },
})
