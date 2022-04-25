import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import "react-multi-carousel/lib/styles.css";
import { useLocation } from "react-router-dom";

interface IPart {
  title: string;
  partName: string;
  partDesc: string;
  partHist: string;
  partNutrition: string;
  partVideo: string;
  partImage: { asset: { _id: string; url: string } };
}

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

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Parts = () => {
  let query = useQuery();
  console.log(query.get("part"));
  const partName = query.get("part") || "";
  const [part, setParts] = useState<IPart | string>("Loading");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "parts"]{
      title,
      partName,
      partDesc,
      partHist,
      partNutrition,
      partVideo,
      partRecipes[]{
       
          recipeName,
          recipeDesc,
          recipeIngredients[] {
            ingredientName,
            unit,
            quantity
          }
        ,
          recipeImage{
            asset->{
              _id,
              url
            },
          },
          recipeVideo,
        
      },
      partImage{
        asset->{
          _id,
          url
        },
      },
    
    }`
      )
      .then((data) => {
        console.log(data);
        console.log(partName);

        data.map((i: IPart) => console.log(i.partName.toLowerCase()));

        setParts(
          partName
            ? data.filter(
                (i: IPart) =>
                  i.partName.toLowerCase() ===
                  partName.toLowerCase().replace(" ", "")
              )[0]
            : null
        );
      })
      .catch(() => setParts(""));
  }, [partName]);

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

  console.log(part);
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
          recipeImage{
            asset->{
              _id,
              url
            },
          },
          recipeVideo,  
      
    }`
      )
      .then((data) =>
        setRecipes(
          data.filter(
            (recipe: IRecipe) =>
              recipe.recipePart.toUpperCase() ===
              partName.toLowerCase().replace(" ", "")
          )
        )
      )
      .catch(() => setRecipes([]));
  }, [partName]);

  return (
    <div className="">
      {part === "Loading" ? <h1>Laster</h1> : <></>}
      {part && typeof part === "object" ? (
        <div className="flex break-words flex-col items-center w-full bg-[#DBEAFE]">
          <div className="flex items-center justify-around w-full mt-5">
            <a href="about-us" className="text-2xl text-blue-600">
              Om oss
            </a>
            <a href="/">
              <img src="Svart logo.png" alt="logo" />
            </a>
            <a href="/recipes" className="text-2xl text-black">
              Oppskrifter
            </a>
          </div>
          <div className="relative flex items-center justify-center w-full">
            <div className="relative z-10 w-4/5 py-5 mx-auto my-10 text-6xl text-center text-white uppercase bg-blue-400">
              <h1>{part.partName}</h1>
            </div>
            <div className="absolute z-0 w-4/5 h-32 mx-auto bg-blue-300 rotate-1"></div>
          </div>

          <div className="flex items-start w-4/5 text-justify">
            <div className="left-0 w-1/2 px-2">
              <h1 className="mb-5 text-3xl text-center text-blue-600">
                {"Hva er " + part.partName.toLowerCase()}
              </h1>
              <p>{part.partDesc}</p>
            </div>
            <div className="w-1/2 px-2">
              <div>
                <h1 className="px-2 mb-5 text-3xl text-center text-blue-600">
                  Bruksområde før og nå
                </h1>
                <p>{part.partHist}</p>
              </div>
              <div>
                <h1 className="my-5 text-3xl text-center text-blue-600">
                  Næringsinnhold
                </h1>
                <p>{part.partNutrition}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full my-20">
            <h1 className="my-5 text-3xl text-center text-blue-600">
              Oppskrifter
            </h1>
            <div className="flex justify-around w-4/5">
              {recipes
                ? recipes.map((recipe, i) =>
                    recipe.recipePart.toLowerCase() ===
                    part.partName.toLowerCase() ? (
                      <a href={`/recipe?code=${i}`}>
                        <div className="p-2 bg-blue-300 w-96">
                          <div className="bg-blue-300 max-w-80 padding-3">
                            <img
                              alt="team member"
                              className="object-cover w-full max-w-80 h-80"
                              src={recipe?.recipeImage[0].asset.url}
                            />
                            <div className="text-center">
                              <h3 className="flex items-center justify-center h-10 my-3 text-lg font-bold text-blue-600 uppercase">
                                {recipe.recipeName}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      ) : part !== "Loading" ? (
        <h1>Eksisterer ikke</h1>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Parts;
