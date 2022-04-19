import { useEffect, useState } from "react";
import sanityClient from "../client";

interface IRecipe {
  title: string;
  recipeName: string;
  recipeImage: { asset: { _id: string; url: string } }[];
  recipeVideo: string;
  recipePart: string;
  recipeIngredients: {
    ingredientsName: string;
    quantity: string;
    unit: string;
  };
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "recipes"]{
              title,
              recipeName,
              recipeDesc,
              recipePart,
              recipeIngredients[] {
                ingredientName,
                unit,
                quantity
              }
            ,
              recipeImage[]{
                asset->{
                  _id,
                  url
                },
              },
              recipeVideo,  
          
        }`
      )
      .then((data) => setRecipes(data))
      .catch(() => setRecipes([]));
  }, []);

  console.log(recipes);

  return (
    <div className="flex flex-col items-center pb-10">
      <div className="flex items-center justify-around w-full mt-5 mb-10">
        <a href="about-us" className="text-2xl text-black">
          Om oss
        </a>
        <a href="/">
          <img src="Svart logo.png" alt="logo" />
        </a>
        <a href="/recipes" className="text-2xl text-blue-600">
          Oppskrifter
        </a>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {recipes.length !== 0 && recipes
          ? recipes.map((recipe, i) => {
              return (
                <a href={`/recipe?code=${i}`}>
                  <div className="p-2 bg-blue-100">
                    <div className="bg-blue-100 max-w-80 padding-3">
                      <img
                        alt="team member"
                        className="object-cover w-full max-w-80 h-80"
                        src={recipe?.recipeImage[0].asset.url}
                      />
                      <div className="text-center">
                        <h3 className="flex items-center justify-center h-10 text-lg font-bold text-blue-600 uppercase">
                          {recipe.recipeName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Recipes;
