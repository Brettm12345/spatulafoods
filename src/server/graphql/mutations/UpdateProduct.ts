import {arg, intArg, mutationField} from 'nexus'

export const UpdateProduct = mutationField('updateProduct', {
  type: 'Product',
  args: {
    id: intArg(),
    data: arg({type: 'UpdateProductInput'}),
  },
  resolve: async (
    _,
    {
      id,
      data: {
        cookingInstructions,
        servingSize,
        compoundNutritionFacts,
        nutritionFacts,
        ingredients,
        contains,
      },
    },
    ctx
  ) => {
    const product = await ctx.prisma.product.update({
      where: {id},
      data: {
        contains,
        ingredients,
        cookingInstructions,
        servingSize: {
          update: servingSize,
        },
      },
    })
    await ctx.prisma.nutritionFact.deleteMany({where: {productId: id}})
    await ctx.prisma.compoundNutritionFact.deleteMany({where: {productId: id}})
    const connectProduct = {
      product: {
        connect: {
          id,
        },
      },
    } as const
    await Promise.all(
      nutritionFacts.map(
        async ({ingredient, measurements, order, dailyValue}) => {
          await ctx.prisma.nutritionFact.create({
            data: {
              ...connectProduct,
              ingredient,
              dailyValue,
              order,
              measurements: {
                create: measurements,
              },
            },
          })
        }
      )
    )
    await Promise.all(
      compoundNutritionFacts.map(
        async ({measurements, ingredient, ingredients, order, dailyValue}) => {
          const nutritionFact = await ctx.prisma.compoundNutritionFact.create({
            data: {
              ...connectProduct,
              ingredient,
              dailyValue,
              order,
              measurements: {
                create: measurements,
              },
            },
            select: {
              id: true,
            },
          })
          await Promise.all(
            ingredients.map(
              async ({ingredient, measurements, order, dailyValue}) => {
                await ctx.prisma.nutritionFact.create({
                  data: {
                    ...connectProduct,
                    ingredient,
                    order,
                    dailyValue,
                    compoundNutritionFact: {
                      connect: {
                        id: nutritionFact.id,
                      },
                    },
                    measurements: {
                      create: measurements,
                    },
                  },
                })
              }
            )
          )
        }
      )
    )
    return product
  },
})
