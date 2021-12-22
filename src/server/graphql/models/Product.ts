import {objectType} from 'nexus'
import {Product} from 'nexus-prisma'

export const ProductModel = objectType({
  name: Product.$name,
  description: Product.$description,
  definition(t) {
    t.field(Product.id)
    t.field(Product.ingredients)
    t.field(Product.servingSize)
    t.field(Product.compoundNutritionFacts)
    t.field(Product.cookingInstructions)
    t.field(Product.shopifyId)
    t.field(Product.nutritionFacts)
    // t.field('image', {
    //   type: 'Image',
    //   resolve: async source => {
    //     return image
    //   },
    // })
    // t.field('name', {
    //   type: 'String',
    //   resolve: async source => {
    //     const {title} = await shopify.product.get(source.shopifyId)
    //     return title
    //   },
    // })
  },
})
