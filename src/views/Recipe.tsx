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

const Recipe = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code") || "0";
  console.log(code);

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

  let codHead = recipes[parseInt(code)];
  console.log(codHead);

  //   useEffect(() => {
  //     codHead = recipes[0];
  //   }, [recipes]);

  return (
    <div className="flex flex-col items-center">
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
      {codHead ? (
        <div>
          <h3>{codHead.recipeName}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Recipe;
