import {MeasurementType} from '@prisma/client'
import {
  NutritionCategory,
  NutritionItem,
  NutritionValue,
} from '../types/products'

export const ingredients = (...ingredients: string[]): string =>
  `(${ingredients.join(', ')})`

export const createNutritionItem = (name: string, item: NutritionItem) =>
  ({
    ingredient: name,
    measurements: {
      create: {
        value: parseFloat(item.content.replace(/[^\d]/g, '')),
        type: item.content.endsWith('mg')
          ? MeasurementType.MILLAGRAMS
          : item.content.endsWith('g')
          ? MeasurementType.GRAMS
          : MeasurementType.UNITS,
      },
    },
  } as const)

export const createMeasurement = (content: string) =>
  ({
    value: parseFloat(content.replace(/[^\d]/g, '')),
    type: content.endsWith('mg')
      ? MeasurementType.MILLAGRAMS
      : content.endsWith('g')
      ? MeasurementType.GRAMS
      : MeasurementType.UNITS,
  } as const)

export const isCategory = (x: NutritionValue): x is NutritionCategory =>
  'breakdown' in x
