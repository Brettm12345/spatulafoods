import {objectType} from 'nexus'
import {NutritionFact} from 'nexus-prisma'

export const NutritionFactModel = objectType({
  name: NutritionFact.$name,
  description: NutritionFact.$description,
  definition(t) {
    t.field(NutritionFact.id)
    t.field(NutritionFact.ingredient)
    t.field(NutritionFact.dailyValue)
    t.field(NutritionFact.measurements)
    t.field(NutritionFact.product)
  },
})
