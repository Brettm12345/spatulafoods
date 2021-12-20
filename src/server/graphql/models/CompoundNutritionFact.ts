import {objectType} from 'nexus'
import {CompoundNutritionFact} from 'nexus-prisma'

export const CompoundNutritionFactModel = objectType({
  name: CompoundNutritionFact.$name,
  description: CompoundNutritionFact.$description,
  definition(t) {
    t.field(CompoundNutritionFact.id)
    t.field(CompoundNutritionFact.ingredient)
    t.field(CompoundNutritionFact.measurements)
    t.field(CompoundNutritionFact.product)
    t.field(CompoundNutritionFact.ingredients)
  },
})
