import {PrismaClient} from '@prisma/client'

import type {Products, NutritionItem} from '../src/types/products'
import {
  createMeasurement,
  createNutritionItem,
  ingredients,
  isCategory,
} from '../src/util/products'

const prisma = new PrismaClient()

interface CreateNutritionFactArgs {
  item: NutritionItem
  name: string
  productId: number
}
type CreateNutritionFact = (args: CreateNutritionFactArgs) => Promise<number>
const createNutritionFact: CreateNutritionFact = async ({
  item,
  name,
  productId,
}) => {
  const {id} = await prisma.nutritionFact.create({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      ...createNutritionItem(name, item),
    },
  })
  return id
}

export const products: Products = {
  [6966542565568]: {
    name: 'Spanish Saffron-Infused Seafood Paella with Chicken and Chorizo',
    servingSize: '250g',
    contains: [
      'Milk',
      'Soy beans',
      'Wheat',
      'Molluscs',
      'Sesame seeds',
      'Sulphites',
    ],
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, add the paella rice, seafood, and vegetables
          with <b>½ cup water</b>.
        </li>
        <li>
          Cook over <b>medium high heat</b>, stirring continually until warmed
          through, roughly <b>8-10 min</b>.
        </li>
        <li>Plate the paella and enjoy!</li>
      </ol>
    `,
    nutrition: {
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
    },
    ingredients: [
      'Chicken broth',
      'Green beans',
      'Spanish rice',
      'Shrimp peeled tail-on',
      'Chicken thigh boneless skinless',
      'Onion yellow',
      'Chorizo',
      'Mussels precooked',
      'Calamari rings',
      'Tomatoes',
      `Wine white cooking ${ingredients('Wine', 'Salt', 'Sulphites')}`,
      'Olive oil',
      'Red bell pepper',
      'Yellow bell pepper',
      'Garlic fresh',
      'Smoked paprika',
      'Canola Oil',
      'Parsley fresh',
      'Kosher salt',
      'Black pepper ground',
      'Bay Leaf',
      'Saffron',
    ],
  },
  [6966534602944]: {
    name: 'Wild Mushroom Truffled Risotto and Parmigiano Reggiano',
    servingSize: '624g',
    contains: ['Milk', 'Sulphites'],
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, add the risotto, wild mushroom mix, and{' '}
          <b>¾ cup water</b>.
        </li>
        <li>
          Cook over <b>medium high heat</b>, stirring continually until creamy
          and thickened, roughly <b>7-8 min</b>.
        </li>
        <li>Garnish with the parmesan petals and enjoy!</li>
      </ol>
    `,
    nutrition: {
      Calories: {
        content: '930',
      },
      'Total Fat': {
        total: {
          content: '42g',
          dailyValue: 54,
        },
        breakdown: {
          'Saturated Fat': {
            content: '19g',
            dailyValue: 97,
          },
          'Trans Fat': {
            content: '0g',
          },
        },
      },
      Cholesterol: {
        content: '80mg',
        dailyValue: 26,
      },
      Sodium: {
        content: '1220mg',
        dailyValue: 53,
      },
      'Total Carbohydrates': {
        total: {
          content: '97g',
          dailyValue: 35,
        },
        breakdown: {
          'Dietary Fiber': {
            content: '2g',
            dailyValue: 7,
          },
          'Total Sugars': {
            content: '4g',
          },
        },
      },
      Protein: {
        content: '28g',
        dailyValue: 56,
      },
      Calcium: {
        content: '670mg',
        dailyValue: 50,
      },
      Iron: {
        content: '1.8mg',
        dailyValue: 10,
      },
      Potassium: {
        content: '320mg',
        dailyValue: 6,
      },
    },
    ingredients: [
      'Water',
      'Arborio rice',
      'Mushroom king oyster',
      'Mushroom whole white',
      'Mushroom sliced white',
      'Olive oil extra-virgin',
      `Wine white cooking ${ingredients('Wine', 'Salt', 'Sulphites')}`,
      'Mushroom shiitake',
      'Cheese grana padano grated',
      'Shallot fresh',
      'Parmesan reggiano',
      'Cream',
      'Butter unsalted',
      'Truffle oil',
      'Garlic granulated',
      'Tarragon',
      'Thyme fresh',
      `Mushroom seasoning ${ingredients(
        'Mushroom powder',
        'Salt',
        'Mushroom Extract'
      )}`,
      'Chives fresh',
      'Kosher salt',
      'Dry parsley flake',
      'Black pepper ground',
      'Nutmeg ground',
    ],
  },
  [6966527918272]: {
    name: 'Slow Braised Beef Bolognese with Rigatoni and Parmigiano Reggiano',
    contains: ['Milk', 'Wheat', 'Soy beans', 'Sulphites'],
    servingSize: '250g',
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, add the bolognese sauce with <b>1/3 cup</b>{' '}
          water.
        </li>
        <li>
          Cook over <b>medium high heat</b>, stirring often until warmed
          through, roughly <b>3-4 min</b>.
        </li>
        <li>
          Add the rigatoni and <b>¼ cup of water</b>. Continue cooking for an
          additional <b>4-5 min</b>, stirring often until the noodles are warmed
          through and the sauce begins to coat the noodles.
        </li>
        <li>Garnish with the parmesan petals and enjoy!</li>
      </ol>
    `,
    nutrition: {
      Calories: {
        content: '670',
      },
      'Total Fat': {
        total: {
          content: '30g',
          dailyValue: 38,
        },
        breakdown: {
          'Saturated Fat': {
            content: '11g',
            dailyValue: 53,
          },
          'Trans Fat': {
            content: '0.5g',
          },
        },
      },
      Cholesterol: {
        content: '75mg',
        dailyValue: 25,
      },
      Sodium: {
        content: '660mg',
        dailyValue: 29,
      },
      'Total Carbohydrates': {
        total: {
          content: '65g',
          dailyValue: 23,
        },
        breakdown: {
          'Dietary Fiber': {
            content: '6g',
            dailyValue: 20,
          },
          'Total Sugars': {
            content: '11g',
          },
        },
      },
      Protein: {
        content: '29g',
        dailyValue: 59,
      },
      Calcium: {
        content: '200mg',
        dailyValue: 15,
      },
      Iron: {
        content: '5.2mg',
        dailyValue: 30,
      },
      Potassium: {
        content: '1040mg',
        dailyValue: 20,
      },
    },
    ingredients: [
      'Ground Beef Lean',
      'Tomato',
      'San Marzano Crushed',
      'Rigatoni',
      'Milk Homo',
      'Beef Broth',
      'Wine Red',
      'Onion Yellow',
      'Pancetta',
      'Carrots',
      'Heavy Cream',
      'Celery',
      'Tomato Paste',
      'Olive Oil Extra-Virgin',
      'Parmesan Reggiano (Petals For Garnish)**',
      'Canola Oil',
      'Cheese Grana Padano Grated',
      'Garlic Granulated',
      'Parsley Fresh Italian',
      'Oregano Dry',
      'Sage Dry',
      'Bay Leaves Dry',
      'Basil Dry',
      'Mushroom Seasoning',
      'Black Pepper Ground',
    ],
  },
  [6966554099904]: {
    name: 'Braised Beef Bourguignon with Pearl Onions and Pomme Purée',
    servingSize: '250g',
    contains: ['Milk', 'Soy', 'Wheat', 'Sulphites'],
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, add the beef bourguignon with <b>1/3 cup</b>{' '}
          of water.
        </li>
        <li>
          Cook over <b>medium high heat</b> until warmed through and slightly
          thickened, roughly <b>6-7 min</b>
        </li>
        <li>
          Meanwhile, in a second non-stick pan, add the pomme puree and cook
          over <b>medium heat</b>, stirring often until warmed through, roughly{' '}
          <b>4-5 min</b>.
        </li>
        <li>Serve the beef bourguignon with the pomme puree and enjoy!</li>
      </ol>
    `,
    nutrition: {
      'Total Fat': {
        total: {
          content: '36g',
          dailyValue: 46,
        },
        breakdown: {
          'Saturated fat': {
            content: '14g',
            dailyValue: 71,
          },
          'Trans fat': {
            content: '0g',
          },
        },
      },
      Cholesterol: {
        content: '100mg',
        dailyValue: 34,
      },
      Sodium: {
        content: '650mg',
        dailyValue: 28,
      },
      'Total Carbohydrates': {
        total: {
          content: '32g',
          dailyValue: 12,
        },
        breakdown: {
          'Dietary Fiber': {
            content: '5g',
            dailyValue: 16,
          },
          'Total Sugars': {
            content: '6g',
          },
        },
      },
      Protein: {
        content: '23g',
        dailyValue: 46,
      },
      Calcium: {
        content: '90mg',
        dailyValue: 8,
      },
      Iron: {
        content: '4.9mg',
        dailyValue: 25,
      },
      Potassium: {
        content: '1040mg',
        dailyValue: 20,
      },
    },
    ingredients: [
      'Beef Broth',
      'Potatoes',
      'Yukon',
      'Beef Chuck',
      'Wine Red Carrots',
      'Onions Pearl IQF',
      'Heavy Cream',
      'Onion Yellow',
      'White Button Mushrooms',
      'Canola Oil',
      'Butter Unsalted',
      'Bacon Double Smoked',
      'Flower AP',
      'Tomato Paste',
      'Rosemary Fresh',
      'Garlic Fresh',
      'Garlic Granulated Thyme Dry',
      'Parsley Fresh Italian',
      'Black Pepper Ground',
      'Bay Leaves Dry',
      'Bay Leaf',
      'Kosher Salt',
    ],
  },
  [6966538076352]: {
    name: 'Singapore Black Pepper Udon with Shrimp and Gai Lan',
    contains: ['Milk', 'Wheat', 'Soy beans', 'Crustacean shellfish'],
    servingSize: '250g',
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, pour in the contents of the shrimp and
          vegetables pouch. Add both packs of noodles on top and add{' '}
          <b>1/2 cup</b> of water.
        </li>
        <li>
          Cook over <b>medium high heat</b>, until the steam from the vegetables
          begins to thaw the udon noodles, roughly <b>3-4 min</b>.
        </li>
        <li>
          Once the udon noodles begin to thaw, cook for an additional{' '}
          <b>5-6 min</b>, stirring often to coat the noodles and warm through.
        </li>
        <li>Garnish with the sesame seeds and enjoy!</li>
      </ol>
    `,
    nutrition: {
      Calories: {
        content: '440',
      },
      'Total Fat': {
        total: {
          content: '17g',
          dailyValue: 22,
        },
        breakdown: {
          'Saturated Fat': {
            content: '9g',
            dailyValue: 46,
          },
          'Trans Fat': {
            content: '0',
          },
        },
      },
      Cholesterol: {
        content: '155mg',
        dailyValue: 38,
      },
      Sodium: {
        content: '1440mg',
        dailyValue: 63,
      },
      'Total Carbohydrate': {
        total: {
          content: '60g',
          dailyValue: 22,
        },
        breakdown: {
          'Dietary Fiber': {
            content: '5g',
            dailyValue: 16,
          },
          'Total Sugars': {
            content: '28g',
          },
        },
      },
      Protein: {
        content: '15g',
        dailyValue: 31,
      },
      Calcium: {
        content: '70mg',
        dailyValue: 6,
      },
      Iron: {
        content: '0.8mg',
        dailyValue: 4,
      },
      Potassium: {
        content: '330mg',
        dailyValue: 6,
      },
    },
    ingredients: [
      'Udon Noodles',
      `Frozen ${ingredients(
        'Wheat Flower',
        'Water',
        'Modified Tapioca Starch',
        'Propylene Glycol',
        'Alginate',
        'Potassium Carbonate'
      )}`,
      'Shrimp Peeled Tail-On (18-20 Size)',
      'Water',
      'Honey',
      'Gailan Leaf',
      'Gailan Stem',
      'Butter Unsalted',
      'Red Bell Pepper',
      `Soy Sauce (Yasama) ${ingredients(
        'Water',
        'Soy Beans',
        'Wheat',
        'Salt',
        'Brewing Starter (Aspergillus Sojae)'
      )}`,
      'Scallion',
      `Shao Hsing Wine ${ingredients(
        'Water',
        'Rice',
        'Wheat',
        'Salt',
        'Caramel'
      )}`,
      'Ginger Fresh',
      'Garlic Fresh',
      `Oyster Sauce ${ingredients(
        'Water',
        'Sugar',
        'Salt',
        'Modified Corn Starch',
        'Oyster Extract',
        'Monosodium Glutamate',
        'Caramel Color',
        'Artificial Flavor',
        'Lactic Acid',
        'Disodium Inosinate',
        'Disodium Guanylate'
      )}`,
      'Canola Oil',
      'Instant Coffee Dark Roast',
      'Black Pepper Ground',
      'White Pepper Ground',
    ],
  },
  [6966548365504]: {
    name: 'Pan Seared Tilapia with Roasted White Wine Tomatoes and Herbed Couscous',
    contains: ['Milk', 'Wheat', 'Soy beans', 'Sulphites'],
    servingSize: '250g',
    cookingInstructions: `
      <ol>
        <li>
          In a large non-stick pan, add the couscous with <b>1/4 cup</b> water.
          Cook over <b>medium low heat</b>, continually stirring until the
          couscous is warmed through, roughly <b>3-4 min</b>.
        </li>
        <li>
          In a different large non-stick pan, first add the tilapia and then the
          tomatoes along with <b>1/4 cup</b> water.
        </li>
        <li>
          Cook over <b>medium high heat</b> for <b>5-6 min</b>, stirring often
          until the sauce has thickened and the fish is warmed through.
        </li>
        <li>
          Serve the tilapia, white wine sauce and tomatoes over the couscous and
          Enjoy!
        </li>
      </ol>
    `,
    nutrition: {
      Calories: {
        content: '400',
      },
      'Total Fat': {
        total: {
          content: '17g',
          dailyValue: 22,
        },
        breakdown: {
          'Saturated Fat': {
            content: '6g',
            dailyValue: 29,
          },
          'Trans Fat': {
            content: '0.5g',
          },
        },
      },
      Cholesterol: {
        content: '65mg',
        dailyValue: 22,
      },
      Sodium: {
        content: '530mg',
        dailyValue: 23,
      },
      'Total Carbohydrates': {
        total: {
          content: '35g',
          dailyValue: 13,
        },
        breakdown: {
          'Dietary Fiber': {
            content: '3g',
            dailyValue: 11,
          },
          'Total Sugars': {
            content: '1g',
          },
        },
      },
      Protein: {
        content: '27g',
        dailyValue: 53,
      },
      Calcium: {
        content: '50mg',
        dailyValue: 4,
      },
      Iron: {
        content: '2.3mg',
        dailyValue: 15,
      },
      Potassium: {
        content: '670mg',
        dailyValue: 15,
      },
    },
    ingredients: [
      'Chicken Broth',
      'Tilapia',
      'Fillets',
      'Cherry Tomatoes',
      'White Wine Cooking',
      'Couscous',
      'Butter Unsalted',
      'Canola Oil',
      'Lemon Juice',
      'Garlic Fresh',
      'Tarragon Fresh',
      'Parsley Fresh Italian',
      'Garlic Granulated',
      'Kosher Salt',
      'Black Pepper Cracked',
      'Mushroom Seasoning',
      'Smoked Paprika',
      'Basil Dry',
    ],
  },
}

const generateProducts = async () => {
  await Promise.all(
    Object.entries(products).map(async ([shopifyId, value]) => {
      const product = await prisma.product.create({
        data: {
          cookingInstructions: value.cookingInstructions,
          servingSize: {
            create: createMeasurement(value.servingSize),
          },
          ingredients: value.ingredients.join(', '),
          contains: value.contains.join(', '),
          shopifyId: parseInt(shopifyId),
        },
      })
      await Promise.all(
        Object.entries(value.nutrition).map(async ([ingredient, value]) => {
          const connectProduct = {
            product: {
              connect: {
                id: product.id,
              },
            },
          } as const
          if (isCategory(value)) {
            const {total, breakdown} = value
            const data = await prisma.compoundNutritionFact.create({
              data: {
                ...connectProduct,
                ...createNutritionItem(ingredient, total),
              },
            })
            await Promise.all(
              Object.entries(breakdown).map(async ([ingredient, value]) => {
                await prisma.nutritionFact.create({
                  data: {
                    ...connectProduct,
                    compoundNutritionFact: {
                      connect: {
                        id: data.id,
                      },
                    },
                    ...createNutritionItem(ingredient, value),
                  },
                })
              })
            )
          } else {
            await createNutritionFact({
              productId: product.id,
              item: value,
              name: ingredient,
            })
          }
        })
      )
    })
  )
}

const faqs = [
  {
    question: 'Preservatives - Are there preservatives in your food?',
    answer:
      'No, we never add any preservatives to any of our products. We use blast-chilling technology to rapidly decrease the temperature of the food. This halts any biological activity in the foods, preserving it in its original state.',
  },
  {
    question: 'Storage - How long can SPATULA meals be stored?',
    answer:
      'All SPATULA meals should be stored in the freezer. They should be consumed within one month of purchase to maximize freshness and quality. Once cooked, leftovers can be stored in the fridge but should be consumed within 48 hours.',
  },
  {
    question: 'Do I have to defrost the meals before eating?',
    answer:
      'Nope! Keep meals in the freezer until you are ready to cook. We have cooking instructions on our packaging as well as on each product page on our website.',
  },
  {
    question: 'Do you offer meals for specific dietary restrictions?',
    answer:
      "We currently don’t have specific recipes for dietary requirements and allergies, but don't worry, we are continuing to add to our assortment! We always list ingredients and nutritional information on our product pages so you can choose dishes that work best for your dietary needs. At the moment unfortunately, we cannot guarantee our ingredients are free from cross-contamination.",
  },
  {
    question: 'Do you provide nutritional and calorie information?',
    answer:
      'Yes, please check out your recipe’s product page for full nutritional information.',
  },
  {
    question: 'How do I store the food?',
    answer:
      'We ask that you immediately put your order in the freezer upon delivery. ',
  },
  {
    question: 'Is SPATULA Foods a subscription service?',
    answer: 'No, currently we are not a subscription service.',
  },
  {
    question: 'Where do your recipes come from?',
    answer:
      'We love to celebrate the diversity and creativity of the local foodie scene! We partner with culinary superstars and Michelin-trained chefs to bring you a dining experience in the comfort of your own home. We also have a few recipes created by our incredible culinary team!',
  },

  {
    question: 'How much does delivery cost?',
    answer:
      'We have a promotion that if you spend $50 you will get free shipping! If you spend under $50, shipping will be $10. ',
  },
  {
    question: 'What delivery days are there?',
    answer:
      'We currently only deliver every week on Tuesday. However, we aim to add more delivery dates to the calendar in the coming months.',
  },
  {
    question: 'How do you ship SPATULA meals?',
    answer:
      'All orders will be delivered to your address on Tuesday. We use insulated boxes and dry ice to keep your food frozen. Dry ice is extremely cold, so please make sure you are handling it with care and ensure you are not directly touching the ice. We ask that you immediately put your order in the freezer upon delivery.  Delivery times are between 10am-8pm. You will receive a text message the night before your delivery with a reminder, and a second text message on Tuesday with tracking details so you can keep track of when your order will be delivered.',
  },
  {
    question: 'When will my order arrive?',
    answer:
      'Orders placed by 11:00 PM Sunday will be shipped and delivered on Tuesday of the following week. Delivery times are between 10am-8pm. You will receive a text message the night before your delivery with a reminder, and a second text message on Tuesday with tracking details so you can keep track of when your order will be delivered. ',
  },

  {
    question: 'When do I need to place my order to receive it next Tuesday? ',
    answer:
      'Orders received by 11:00 PM Sunday will be shipped and delivered on Tuesday of the following week. Any orders placed after 11:00 PM Sunday will be shipped and delivered in the next cycle.',
  },
  {
    question: 'How does my food stay frozen in transit?',
    answer:
      'We use insulated boxes and dry ice to keep your food frozen. Dry ice is extremely cold, so please make sure you are handling it with care and ensure you are not directly touching it. We ask that you immediately put your order in the freezer upon delivery. ',
  },
  {
    question: 'Are there instructions on how to make my SPATULA meal?',
    answer:
      'Yes! Cooking instructions are on the packaging, but you can also check out your recipe’s product page on our website for detailed instructions on how to cook your meal.',
  },
  {
    question: 'Where do you deliver?',
    answer:
      'Currently we deliver in the Greater Toronto Area only. However, join our mailing list to stay tuned as we may soon come to your city!',
  },
  {
    question: 'What if I’m not home on my delivery time?',
    answer:
      'If you aren’t home at the time of your delivery the driver will leave the package at your door. Because we ship all orders in insulated boxes with dry ice, once dropped off, your delivery will stay frozen for up to 4 additional hours.',
  },

  {
    question: 'How do I track my order?',
    answer:
      'You will receive a text message the night before your delivery with a reminder, and a second text message on Tuesday with tracking details so you can keep track of when your order will be delivered. ',
  },

  {
    question: 'How do I know the delivery time?',
    answer:
      'Delivery times are between 8am-10pm. You will receive a text message the night before your delivery with a reminder, and a second text message on Tuesday with tracking details so you can keep track of when your order will be delivered.  ',
  },

  {
    question: 'My order didn’t arrive. What should I do?',
    answer:
      "Please double check your delivery date. Our deliveries can take place between 10am-8pm EST. It may be that the delivery driver hasn't reached you.  You will receive a text message the night before your delivery with a reminder, and a second text message on Tuesday with tracking details so you can keep track of when your order will be delivered. If your delivery window has passed and your order still hasn't arrived, please get in touch with our team and we will look into this right away!",
  },

  {
    question:
      'I live in a condo building with no concierge, how can I get SPATULA Foods delivered to me?',
    answer:
      'You can include your buzzer code in your special delivery instructions so that the driver can leave your order in your lobby or at your door. ',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We currently accept all major credit cards: VISA, MasterCard, American Express',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Please contact us at hello@spatulafoods.comimmediately if you are not completely satisfied with any of your meals, service or delivery. ',
  },
  {
    question: 'Where do your ingredients come from?',
    answer:
      'We work with both local and national distributors to bring you high quality and fresh ingredients. ',
  },

  {
    question: 'Can I recycle the packaging?',
    answer:
      'Our shipping boxes are recyclable so we recommend putting all cardboard and paper items out with your household recycling. Just remember to remove any stickers!',
  },
]

const generateFaqs = async () => {
  await prisma.faq.deleteMany({
    where: {
      id: {
        not: undefined,
      },
    },
  })
  await prisma.faq.createMany({
    data: faqs,
  })
}

generateProducts()
generateFaqs()
