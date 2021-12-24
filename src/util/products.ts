import type {MeasurementInput} from '../generated/graphql'
import {MeasurementType} from '../generated/graphql'
import type {
  NutritionCategory,
  NutritionItem,
  NutritionValue,
} from '../types/products'

export const ingredients = (...ingredients: string[]): string =>
  `(${ingredients.join(', ')})`

export const createNutritionItem = (
  name: string,
  item: NutritionItem,
  index: number
) =>
  ({
    order: index,
    ingredient: name,
    dailyValue: item.dailyValue,
    measurements: {
      create: {
        value: parseFloat(item.content.replace(/[^\d]/g, '')),
        type: item.content.endsWith('mg')
          ? MeasurementType.Millagrams
          : item.content.endsWith('g')
          ? MeasurementType.Grams
          : MeasurementType.Units,
      },
    },
  } as const)

export const createMeasurement = (content: string): MeasurementInput => ({
  value: parseFloat(content.replace(/[^\d]/g, '')),
  type: content.endsWith('mg')
    ? MeasurementType.Millagrams
    : content.endsWith('g')
    ? MeasurementType.Grams
    : MeasurementType.Units,
})

export const isCategory = (x: NutritionValue): x is NutritionCategory =>
  'breakdown' in x

export const getMeasurementType = (x: string): MeasurementType => {
  if (x.endsWith('mg')) return MeasurementType.Millagrams
  if (x.endsWith('g')) return MeasurementType.Grams
  return MeasurementType.Units
}
