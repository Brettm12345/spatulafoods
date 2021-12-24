import {useMemo, useState} from 'react'

import {Tab} from '@headlessui/react'
import {SaveIcon} from '@heroicons/react/solid'
import Blockquote from '@tiptap/extension-blockquote'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'
import type {NextPage} from 'next'
import toast from 'react-hot-toast'

import {
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../generated/graphql'
import {MeasurementType} from '../generated/graphql'
import {createFromProduct, useNutritionFacts} from '../hooks/useNutritionFacts'
import {createMeasurement} from '../util/products'
import {Button} from './Button'
import {NutritionFactTable} from './NutritionFactTable/NutritionFactTable'
import {ProductSelect} from './ProductSelector'
import {RichTextEditor} from './RichTextEditor'
import {Toast} from './Toast'

export const ProductPage: NextPage = () => {
  const [shopifyId, setShopifyId] = useState<number>()
  const [{data, fetching}] = useAllProductsQuery()
  const [ingredients, setIngredients] = useState<string>()
  const [contains, setContains] = useState<string>()
  const [servingSize, setServingSize] = useState<string>()
  const [servingSizeType, setServingSizeType] = useState<MeasurementType>(
    MeasurementType.Grams
  )
  const product = useMemo(
    () => data?.products?.find(product => product.shopifyId === shopifyId),
    [data, fetching, shopifyId]
  )
  const {nutritionFacts, setNutritionFacts} = useNutritionFacts()
  const [{fetching: updating}, updateProduct] = useUpdateProductMutation()
  const [{fetching: creating}, createProduct] = useCreateProductMutation()

  // TODO: Remove duplication
  const handleSave = async () => {
    if (product) {
      await updateProduct({
        id: product.id,
        data: {
          compoundNutritionFacts: nutritionFacts
            .map((value, order) => ({...value, order}))
            .filter(x => x?.ingredients?.length > 0)
            .map(({ingredient, ingredients, content, dailyValue, order}) => ({
              ingredient,
              order,
              dailyValue,
              measurements: createMeasurement(content),
              ingredients: ingredients.map((ingredient, order) => ({
                order,
                ingredient: ingredient.ingredient,
                // TODO: For some reason the types are wrong here
                // @ts-ignore
                measurements: {
                  // @ts-ignore
                  type: ingredient.measurements.type,
                  // @ts-ignore
                  value: ingredient.measurements.value,
                },
              })),
            })),
          nutritionFacts: nutritionFacts
            .map((value, order) => ({...value, order}))
            .filter(x => !x?.ingredients || x?.ingredients?.length === 0)
            .map(({ingredient, content, dailyValue, order}) => ({
              order,
              ingredient,
              dailyValue,
              measurements: createMeasurement(content),
            })),
          contains,
          cookingInstructions: editor.getHTML(),
          ingredients,
          servingSize: {
            type: servingSizeType,
            value: parseFloat(servingSize),
          },
        },
      })
    } else {
      await createProduct({
        data: {
          shopifyId,
          compoundNutritionFacts: nutritionFacts
            .map((value, order) => ({...value, order}))
            .filter(x => x?.ingredients?.length > 0)
            .map(({ingredient, ingredients, content, dailyValue, order}) => ({
              ingredient,
              order,
              dailyValue,
              measurements: createMeasurement(content),
              ingredients: ingredients.map((ingredient, order) => ({
                order,
                ingredient: ingredient.ingredient,
                // TODO: For some reason the types are wrong here
                // @ts-ignore
                measurements: {
                  // @ts-ignore
                  type: ingredient.measurements.type,
                  // @ts-ignore
                  value: ingredient.measurements.value,
                },
              })),
            })),
          nutritionFacts: nutritionFacts
            .map((value, order) => ({...value, order}))
            .filter(x => !x?.ingredients || x?.ingredients?.length === 0)
            .map(({ingredient, content, dailyValue, order}) => ({
              order,
              ingredient,
              dailyValue,
              measurements: createMeasurement(content),
            })),
          contains,
          cookingInstructions: editor.getHTML(),
          ingredients,
          servingSize: {
            type: servingSizeType,
            value: parseFloat(servingSize),
          },
        },
      })
    }
    toast.custom(t => <Toast t={t} title="Product Saved" />)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: product?.cookingInstructions,
  })
  return (
    <div className="w-11/12 px-2 py-16 mx-auto sm:px-0">
      <div className="flex items-center justify-center mb-10 space-x-2">
        <ProductSelect
          onChange={id => {
            const p = data?.products?.find(product => product.shopifyId === id)
            setShopifyId(id)
            if (p) {
              editor.chain().setContent(p?.cookingInstructions).run()
              setNutritionFacts(createFromProduct(p))
              setServingSize(p.servingSize.value.toString())
              setServingSizeType(p.servingSize.type)
              setIngredients(p.ingredients)
              setContains(p.contains)
            } else {
              editor.chain().setContent('').run()
              setNutritionFacts([])
              setServingSize(null)
              setServingSizeType(MeasurementType.Grams)
              setIngredients('')
              setContains('')
            }
          }}
          value={shopifyId}
        />
        <Button
          className="btn-sky disabled:bg-gray-700 disabled:text-opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
          onClick={handleSave}
          leftIcon={<SaveIcon />}
          disabled={
            !shopifyId ||
            !ingredients ||
            ingredients.length === 0 ||
            !servingSize ||
            !contains ||
            !nutritionFacts ||
            nutritionFacts.length === 0 ||
            editor.getHTML() === ''
          }
          loadingText="Saving product"
          loading={product ? updating : creating}
        >
          Save Product
        </Button>
      </div>
      {shopifyId && (
        <Tab.Group>
          <Tab.List className="flex max-w-2xl p-1 mx-auto space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {['Cooking Instructions', 'Nutrition Facts', 'Ingredients'].map(
              category => (
                <Tab
                  key={category}
                  className={({selected}) =>
                    clsx(
                      'w-full py-2.5 text-sm leading-5 font-medium rounded-lg text-gray-900',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60',
                      'transition-colors ease-mantine duration-200',
                      'select-none',
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-600 dark:text-gray-100 hover:bg-black/5 hover:text-gray-700 dark:hover:bg-white/[0.12] dark:hover:text-white'
                    )
                  }
                >
                  {category}
                </Tab>
              )
            )}
          </Tab.List>
          <Tab.Panels className="mt-8">
            <Tab.Panel>
              <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-800">
                <RichTextEditor editor={editor} />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <NutritionFactTable />
            </Tab.Panel>
            <Tab.Panel className="max-w-2xl mx-auto">
              <div className="p-6 bg-white rounded-md shadow-lg dark:bg-gray-800">
                <div className="mb-6">
                  <label htmlFor="content" className="form-label">
                    Serving Size
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="servingSize"
                      onChange={event => {
                        setServingSize(event.target.value)
                      }}
                      value={servingSize}
                      id="servingSize"
                      className="block w-full pr-12 border-gray-300 rounded-md input focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="unit" className="sr-only">
                        Unit
                      </label>
                      <select
                        id="unit"
                        name="unit"
                        className="h-full py-0 pl-2 text-gray-600 bg-transparent border-transparent rounded-md dark:text-gray-400 max-w-fit focus:ring-blue-500 focus:border-blue-500 pr-7 sm:text-sm"
                        value={servingSizeType}
                        onChange={event => {
                          setServingSizeType(
                            event.target.value as MeasurementType
                          )
                        }}
                      >
                        <option value={MeasurementType.Millagrams}>
                          Milligrams
                        </option>
                        <option value={MeasurementType.Grams}>Grams</option>
                        <option value={MeasurementType.Units}>Units</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="question" className="form-label">
                    Ingredients
                  </label>
                  <textarea
                    id="ingredients"
                    className="input"
                    placeholder=""
                    onChange={event => {
                      setIngredients(event.target.value)
                    }}
                    value={ingredients}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="question" className="form-label">
                    Contains
                  </label>
                  <textarea
                    id="ingredient"
                    className="input"
                    placeholder=""
                    onChange={event => {
                      setContains(event.target.value)
                    }}
                    value={contains}
                    required
                  />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  )
}
