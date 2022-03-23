export default {
    title: 'Stykningsdeler',
    name: 'parts',
    type: 'document',
    fields: [{
        title: 'Stykningsdel',
        name: 'partName',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        title: 'Beskrivelse',
        name: 'partDesc',
        type: 'text',  
        validation: Rule => Rule.required()
      },
      {
        title: 'Historie',
        name: 'partHist',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        title: 'Næring',
        name: 'partNutrition',
        type: 'text',      
        validation: Rule => Rule.required()
      },
      {
        title: "Bilde",
        name: "partImage",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: Rule => Rule.required()
      },
      {
        title: "Videolenke",
        name: "partVideo",
        type: "url",
        options: {
          hotspot: true,
        },
      },
      
    ]
  }