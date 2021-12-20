export interface NutritionItem {
  content: `${number}` | `${number}mg` | `${number}g`
  dailyValue?: number
}
export interface NutritionCategory {
  total: NutritionItem
  breakdown: Record<string, NutritionItem>
}

export type NutritionValue = NutritionCategory | NutritionItem

export type Nutrition = Record<string, NutritionValue>

export interface Product {
  name: string
  cookingInstructions: string
  servingSize: `${number}g`
  contains: string[]
  nutrition: Nutrition
  ingredients: string[]
}

export type ID = number

export type Products = Record<ID, Product>
