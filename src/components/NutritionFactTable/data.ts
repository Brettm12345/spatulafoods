import type {NutritionItem} from '../../hooks/useNutritionFacts'
import type {
  NutritionItem as OldNutritionItem,
  NutritionCategory,
  NutritionValue,
  Nutrition,
} from '../../types/products'
import {isCategory} from '../../util/products'

const {entries} = Object
const transformNutritionItem = (
  name: string,
  index: number,
  {content, dailyValue}: OldNutritionItem,
  parentId?: string
): NutritionItem => ({
  id: index.toString(),
  content,
  dailyValue,
  ingredient: name,
  parentId,
  ingredients: [],
})

const transformNutritionCategory = (
  name: string,
  index: number,
  {total, breakdown}: NutritionCategory
): NutritionItem => ({
  ...transformNutritionValue(name, index, total),
  ingredients: entries(breakdown).map(([name, value], i) =>
    transformNutritionItem(name, i + 1000, value, index.toString())
  ),
})

const transformNutritionValue = (
  name: string,
  index: number,
  value: NutritionValue
): NutritionItem =>
  isCategory(value)
    ? transformNutritionCategory(name, index, value)
    : transformNutritionItem(name, index, value)

const nutrition: Nutrition = {
  Calories: {
    content: '400',
  },
  'Total Fat': {
    total: {
      content: '15g',
      dailyValue: 20,
    },
    breakdown: {
      'Saturated Fat': {
        content: '3g',
        dailyValue: 16,
      },
      'Trans Fat': {
        content: '0g',
      },
    },
  },
  Cholesterol: {
    content: '105mg',
    dailyValue: 36,
  },
  Sodium: {
    content: '660mg',
    dailyValue: 29,
  },
  'Total Carbohydrates': {
    total: {
      content: '42g',
      dailyValue: 15,
    },
    breakdown: {
      'Dietary Fiber': {
        content: '2g',
        dailyValue: 7,
      },
      'Total Sugars': {
        content: '3g',
      },
    },
  },
  Protein: {
    content: '21g',
    dailyValue: 42,
  },
  Calcium: {
    content: '70mg',
    dailyValue: 6,
  },
  Iron: {
    content: '2.7mg',
    dailyValue: 15,
  },
  Potassium: {
    content: '510mg',
    dailyValue: 10,
  },
}

export const data = Object.entries(nutrition).map(([name, value], index) =>
  transformNutritionValue(name, index, value)
)
