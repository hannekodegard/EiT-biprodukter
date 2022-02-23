import ingredients from "./ingredients";

export default {
    title: 'Oppskrifter',
    name: 'recipes',
    type: 'document',
    fields: [{
        title: 'Navn',
        name: 'recipeName',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        title: 'Beskrivelse',
        name: 'recipeDesc',
        type: 'text',  
        validation: Rule => Rule.required()
      },
    
      {
        title: 'Ingredienser',
        name: 'recipeIngredients',
        type: 'array',
        of: [{type: 'ingredients'}]
      },
      {
        title: "Bilde",
        name: "recipeImage",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: Rule => Rule.required()
      },
      {
        title: "Videolenke",
        name: "recipeVideo",
        type: "url",
        options: {
          hotspot: true,
        },
      },
     
    ]
  }