import {useCallback, useState} from 'react'

import {arrayMove} from '@dnd-kit/sortable'
import constate from 'constate'
import {lens} from 'lens.ts'

import type {
  FullProductFragment,
  MeasurementsFragment,
} from '../generated/graphql'
import {MeasurementType} from '../generated/graphql'
import {log} from '../util/log'

type Content = `${number}` | `${number}mg` | `${number}g`
export interface NutritionItem {
  id: string
  ingredient: string
  content: Content
  dailyValue?: number
  parentId?: string
  ingredients?: NutritionItem[]
}

export type NutritionFacts = NutritionItem[]

export const nutritionItemLens = lens<NutritionItem>()
export const nutritionFactLens = lens<NutritionFacts>()

interface UseNutritionFactsProps {
  items: NutritionFacts
}
const measurementSymbols: Record<MeasurementType, string> = {
  [MeasurementType.Grams]: 'g',
  [MeasurementType.Millagrams]: 'mg',
  [MeasurementType.Units]: '',
}
export const createMeasurements = (
  measurements: MeasurementsFragment
): Content =>
  `${measurements.value}${measurementSymbols[measurements.type]}` as Content

export const createFromProduct = (
  product: FullProductFragment
): NutritionItem[] => [
  ...product.nutritionFacts.map(
    ({id, dailyValue, ingredient, measurements, order}) => ({
      id: id.toString(),
      content: createMeasurements(measurements),
      dailyValue,
      order,
      ingredient,
    })
  ),
  ...product.compoundNutritionFacts
    .map(
      ({id: parentId, dailyValue, ingredient, ingredients, measurements}) => ({
        id: parentId.toString(),
        dailyValue,
        order,
        ingredient,
        content: createMeasurements(measurements),
        ingredients: ingredients
          .map(({id, dailyValue, ingredient, measurements, order}) => ({
            id: id.toString(),
            dailyValue,
            order,
            ingredient,
            content: createMeasurements(measurements),
            measurements,
            parentId: parentId.toString(),
          }))
          .sort((a, b) => b.order - a.order),
      })
    )
    .sort((a, b) => b.order - a.order)
    .map(({order: _order, ...item}) => item),
]
export const useNutritionFactsState = ({items}: UseNutritionFactsProps) => {
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFacts>(items)
  console.log(nutritionFacts)
  const getIndex = useCallback(
    (id: string): number =>
      log(nutritionFacts.findIndex(nutritionFact => nutritionFact.id === id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(nutritionFacts), nutritionFacts]
  )
  const moveNutritionFact = (oldIndex: number, newIndex: number) => {
    setNutritionFacts(nutritionFacts =>
      arrayMove(nutritionFacts, oldIndex, newIndex)
    )
  }
  const moveSubNutritionFact = (
    oldIndex: number,
    newIndex: number,
    parentIndex: number
  ) => {
    setNutritionFacts(
      nutritionFactLens
        .k(parentIndex)
        .ingredients.set(ingredients =>
          arrayMove(ingredients, oldIndex, newIndex)
        )
    )
  }
  const getSubNutritionFact = (id: string, parentId: string) => {
    const parentIndex = getIndex(parentId)
    const index = nutritionFacts[parentIndex].ingredients.findIndex(
      ingredient => ingredient.id === id
    )
    return {
      index,
      parentIndex,
    }
  }
  const moveUp = (id: string) => {
    const index = getIndex(id)
    moveNutritionFact(index, index - 1)
  }
  const moveDown = (id: string) => {
    const index = getIndex(id)
    moveNutritionFact(index, index + 1)
  }
  const moveSubNutritionFactUp = (id: string, parentId: string) => {
    const {index, parentIndex} = getSubNutritionFact(id, parentId)
    moveSubNutritionFact(index, index - 1, parentIndex)
  }
  const moveSubNutritionFactDown = (id: string, parentId: string) => {
    const {index, parentIndex} = getSubNutritionFact(id, parentId)
    moveSubNutritionFact(index, index + 1, parentIndex)
  }
  return {
    nutritionFacts,
    moveUp,
    moveDown,
    moveSubNutritionFactDown,
    moveSubNutritionFactUp,
    setNutritionFacts,
  }
}

export const [NutritionFactProvider, useNutritionFacts] = constate(
  useNutritionFactsState
)
