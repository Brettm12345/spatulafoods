import {objectType} from 'nexus'
import {Product} from 'nexus-prisma'

export const ProductModel = objectType({
  name: Product.$name,
  description: Product.$description,
  definition(t) {
    t.field(Product.id)
    t.field(Product.contains)
    t.field(Product.ingredients)
    t.field(Product.servingSize)
    t.field(Product.cookingInstructions)
    t.field(Product.shopifyId)
    t.field({
      resolve: (source, _, ctx) =>
        ctx.prisma.compoundNutritionFact.findMany({
          where: {productId: source.id},
          orderBy: {order: 'asc'},
        }),
      ...Product.compoundNutritionFacts,
    })
    t.field({
      ...Product.nutritionFacts,
      resolve: async (source, _, ctx) => {
        const result = await ctx.prisma.nutritionFact.findMany({
          orderBy: {order: 'asc'},
          where: {AND: [{productId: source.id, compoundNutritionFactId: null}]},
        })
        return result
      },
    })
    t.nullable.field('image', {
      type: 'Image',
      resolve: async (source, _, ctx) => {
        const {image} = await ctx.shopify.product.get(source.shopifyId)
        return image
      },
    })
    t.nullable.field('name', {
      type: 'String',
      resolve: async (source, _, ctx) => {
        try {
          const {title} = await ctx.shopify.product.get(source.shopifyId)
          return title
        } catch {
          return null
        }
      },
    })
  },
})
