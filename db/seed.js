'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Recipe, RecipeStep, Resource, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    things: things(),
    recipes: recipes()
  }

  seeded.favorites = favorites(seeded)
  seeded.recipeSteps = recipeSteps(seeded)
  seeded.resources = resources(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    name: 'So many names',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
})

const recipes = seed(Recipe, {
  chorizoMeatballSliders: {
    name: 'Chorizo Meatball Sliders',
    ingredients: ['1/2 cup panko bread crumbs', '1 lb. chorrizo', '1/2 cup veal or beef stock', '1/4 cup roasted and diced poblano peppers', '1/2 cup minced carrots', '1/2 cup chopped white or yellow onion', '6 tablespoons grated Cotija Cheese', '1 large egg', '1 large egg yolk', '1/4 cup chopped fresh cilantro', '1/4 cup chopped fresh parsley leaves', '1 teaspoon salt', '1/2 teaspoon ground black pepper', '3 tablespoons olive oil', '6 garlic cloves, chopped', '1 28 oz. can crushed tomatoes', '3 chipotles in Adobo', '12 slider buns'],
    videoUrl: 'https://www.youtube.com/watch?v=eZbT1hKYAbY',
    time: '1 hr 15 min'
  },
  ChewyChocolateChipCookies: {
    name: 'The Best Chewy Chocolate Chip Cookies',
    ingredients: ['1/2 cup sugar', '3/4 cup brown sugar, packed', '1 teaspoon salt', '1/2 cup butter, melted', '1 egg', '1 teaspoon vanilla extract', '1 1/4 cups all-purpose flour', '1/2 teaspoon baking soda', '4 ounces milk or semi-sweet chocolate chunks', '4 ounces dark chocolate chunks (or your preference)'],
    videoUrl: 'https://www.youtube.com/watch?v=3vUtRRZG0xY',
    time: '1 hr'
  }
})

const things = seed(Thing, {
  surfing: {name: 'surfing'},
  smiting: {name: 'smiting'},
  puppies: {name: 'puppies'},
})

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

const recipeSteps = seed(RecipeStep,
  ({recipes}) => ({
    'chorizoMeatballSlidersStep1': {
      step: 1,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Preheat the oven to 350 degrees F.'
    },
    'chorizoMeatballSlidersStep2': {
      step: 2,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'In a pan over medium heat, lightly brown the chorizo for about 5-7 minutes to cook out excess fat. The chorizo does not have to be cooked through. Once cooked, remove the chorizo from heat and drain any excess oil.',
      ingredients: ['1 lb. Chorizo'],
      timer: 6
    },
    'chorizoMeatballSlidersStep3': {
      step: 3,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'In a medium bowl, mix the chorizo, bread crumbs, stock, poblano peppers, carrots, onions, Cotija cheese, egg, egg yolk, cilantro, parsley, salt, and pepper. Use your hands to roll the mixture into approximately 12-16 golf ball-sized meatballs.',
      ingredients: ['Cooked chorizo', '1/2 cup panko bread crumbs', '1/4 cup stock', '1/4 cup poblano peppers', '1/4 cup onions', '6 tablespoons Cotija cheese', '1 egg', '1 egg yolk', '1/4 cup chopped fresh cilantro', '1/4 cup chopped fresh parsley leaves', '1 teaspoon salt', '1/2 teaspoon ground black pepper']
    },
    'chorizoMeatballSlidersStep4': {
      step: 4,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Transfer the meatballs to a baking sheet and bake for about 20 minutes.',
      timer: 20
    },
    'chorizoMeatballSlidersStep5': {
      step: 5,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'In a dutch oven or heavy-bottomed pan over medium heat, add oil and saute remaining onions and garlic until fragrant and translucent, about 5 minutes.',
      ingredients: ['1/4 cup onions', '6 garlic cloves, chopped'],
      timer: 5
    },
    'chorizoMeatballSlidersStep6': {
      step: 6,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Add the can of tomatoes and the remaining stock. Tip: adding the stock into the empty can will ensure you don\'t waste any tomatoes that may be left behind!',
      ingredients: ['1 28 oz. can crushed tomatoes', '1/4 cup stock']
    },
    'chorizoMeatballSlidersStep7': {
      step: 7,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Add the chipotles in adobo and simmer about 5 minutes',
      ingredients: ['3 chipotles in adobo'],
      timer: 5
    },
    'chorizoMeatballSlidersStep8': {
      step: 8,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Add the meatballs, cover with lid slightly ajar, and simmer for about 30 minutes until the meatballs are cooked through.',
      ingredients: ['Meatballs'],
      timer: 30
    },
    'chorizoMeatballSlidersStep9': {
      step: 9,
      recipe_id: recipes.chorizoMeatballSliders.id,
      text: 'Cut slider buns in half. Remove meatballs from skillet and place one on the bottom halves of each roll, then drizzle with some of the tomato sauce and sprinkle cheese on top. Sandwich the tops onto the meatballs and serve immediately.',
      ingredients: ['Slider buns'],
      last: true
    },
    'chocolateChipCookiesStep1': {
      step: 1,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Preheat oven to 350 degrees F.'
    },
    'chocolateChipCookiesStep2': {
      step: 2,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'In a large bowl, whisk together the sugars, salt, and butter until a paste has formed with no lumps.'
    },
    'chocolateChipCookiesStep3': {
      step: 3,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Whisk in the egg and vanilla, beating until light ribbons fall off the whisk.'
    },
    'chocolateChipCookiesStep4': {
      step: 4,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Sift in the flour and baking soda, then fold the mixture with a spatula, being careful not to overmix too much. This will cause the gluten in the flour to toughen which will result in cakier cookies.'
    },
    'chocolateChipCookiesStep5': {
      step: 5,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Fold in the chocolate chunks evenly, then chill the dough for at least 30 minutes. For a more intense toffee-like flavor and deeper color, chill the dough overnight. The longer the dough rests, the more complex its flavor will be.'
    },
    'chocolateChipCookiesStep6': {
      step: 6,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Scoop the dough with an ice-cream scoop onto a parchment paper-lined baking sheet, leaving at least 4 inches of space between cookies and 2 inches of space from the edges of the pan so that the cookies can spread evenly.'
    },
    'chocolateChipCookiesStep7': {
      step: 7,
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      text: 'Bake for 12-15 minutes, or until the edges have started to barely brown.',
      timer: 13,
      last: true
    }
  })
)

const resources = seed(Resource,
  ({recipeSteps, recipes}) => ({
    'chorizoMeatballSlidersStep2': {
      recipe_id: recipes.chorizoMeatballSliders.id,
      recipe_step_id: recipeSteps.chorizoMeatballSlidersStep2.id,
      name: 'How To Brown Chicken & Beef',
      videoUrl: 'https://www.youtube.com/watch?v=Qf8B5f9QEko'
    },
    'chorizoMeatballSlidersStep3': {
      recipe_id: recipes.chorizoMeatballSliders.id,
      recipe_step_id: recipeSteps.chorizoMeatballSlidersStep3.id,
      name: 'How To Roll Meatballs',
      videoUrl: 'https://www.youtube.com/watch?v=Dt-5u-8ts6E'
    },
    'chorizoMeatballSlidersStep5': {
      recipe_id: recipes.chorizoMeatballSliders.id,
      recipe_step_id: recipeSteps.chorizoMeatballSlidersStep5.id,
      name: 'How To Saute Vegetables',
      videoUrl: 'https://www.youtube.com/watch?v=u6557ULaHdg'
    },
    'chorizoMeatballSlidersStep7': {
      recipe_id: recipes.chorizoMeatballSliders.id,
      recipe_step_id: recipeSteps.chorizoMeatballSlidersStep7.id,
      name: 'How To Simmer',
      videoUrl: 'https://www.youtube.com/watch?v=R-PHZ_B_i7k'
    },
    'chorizoMeatballSlidersStep8': {
      recipe_id: recipes.chorizoMeatballSliders.id,
      recipe_step_id: recipeSteps.chorizoMeatballSlidersStep8.id,
      name: 'How To Simmer',
      videoUrl: 'https://www.youtube.com/watch?v=R-PHZ_B_i7k'
    },
    'chocolateChipCookiesStep2': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep2.id,
      name: 'How To Whisk',
      videoUrl: 'https://www.youtube.com/watch?v=Cw5msH2mAkg'
    },
    'chocolateChipCookiesStep3': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep3.id,
      name: 'How To Whisk',
      videoUrl: 'https://www.youtube.com/watch?v=Cw5msH2mAkg'
    },
    'chocolateChipCookiesStep4': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep4.id,
      name: 'How To Sift',
      videoUrl: 'https://www.youtube.com/watch?v=osshrJZsTNw'
    },
    'chocolateChipCookiesStep42': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep4.id,
      name: 'How To Fold Ingredients for Baking',
      videoUrl: 'https://www.youtube.com/watch?v=vP4vbktd-PM'
    },
    'chocolateChipCookiesStep5': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep5.id,
      name: 'How To Fold Ingredients for Baking',
      videoUrl: 'https://www.youtube.com/watch?v=vP4vbktd-PM'
    },
    'chocolateChipCookiesStep6': {
      recipe_id: recipes.ChewyChocolateChipCookies.id,
      recipe_step_id: recipeSteps.chocolateChipCookiesStep6.id,
      name: 'How To Roll Out Cookie Dough',
      videoUrl: 'https://www.youtube.com/watch?v=3eVybstMyjc'
    }
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, things, favorites, recipes})
