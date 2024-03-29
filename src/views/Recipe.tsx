import { useEffect, useState } from "react";
import sanityClient from "../client";

interface IRecipe {
  title: string;
  recipeName: string;
  recipeDesc: string;
  recipeImage: { asset: { _id: string; url: string } }[];
  recipeVideo: string;
  recipePart: string;
  recipeToDo: string;
  recipeIngredients: {
    ingredientName: string;
    quantity: string;
    unit: string;
  }[];
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
                recipeToDo,
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

  return (
    <div className="flex flex-col items-center bg-blue-100">
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
        <div className="w-4/5 m-auto">
          <img
            className="h-[40rem] object-cover w-full"
            src={codHead.recipeImage[0].asset.url}
            alt="recipe"
          />
          <h1 className="my-3 text-6xl text-black">{codHead.recipeName}</h1>
          <p className="mt-3 mb-10">{codHead.recipeDesc}</p>
          <div className="flex w-full mb-10">
            <div className="w-2/5 divide-blue-600">
              <h3 className="text-3xl">INGREDIENSER</h3>
              <hr className="w-3/5 mb-5" />
              {codHead.recipeIngredients.map((ingredient) => {
                return (
                  <p>{`${ingredient.quantity ? ingredient.quantity : ""} ${
                    ingredient.ingredientName
                  }`}</p>
                );
              })}
            </div>

            <div className="w-3/5 divide-blue-600">
              <h3 className="text-3xl">SLIK GJØR DU:</h3>
              <hr className="w-3/5 mb-5" />
              {codHead.recipeToDo
                .replace("\n", "")
                .split(/\d/)
                .filter((elem) => elem.length >= 5)
                .map((step, i) => {
                  return (
                    <div className="flex items-center">
                      <p className="mr-2 text-[#7C8EEE] text-5xl">{i + 1}</p>
                      <p>{step.replace(".", "")}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          {codHead.recipeVideo ? (
            <div className="divide-blue-600">
              <h3 className="w-full text-3xl text-center">FREMGANGSMÅTE:</h3>
              <hr className="w-3/5 mx-auto mb-5" />
              <iframe
                title="video"
                className="w-full h-[40rem] mb-16"
                src={codHead.recipeVideo}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Recipe;
