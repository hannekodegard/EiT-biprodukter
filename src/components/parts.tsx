import React, { useState, useEffect } from "react";
import sanityClient from "../client";

const Parts = () => {
  const [parts, setParts] = useState<any[]>();

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
      partRecipes{
        asset->{
          _id,
          recipeName,
          recipeDesc,
          recipeIngredients,
          recipeImage{
            asset->{
              _id,
              url
            },
          },
          recipeVideo,
        }
      },
      partImage{
        asset->{
          _id,
          url
        },
      },
    
    }`
      )
      .then((data) => setParts(data))
      .catch(console.error);
  }, []);

  console.log(parts);
  return (
    <div className="">
      <h3 className="text-3xl font-bold text-center my-10 lg:my-5">
        All Categories
      </h3>

      <div className="flex flex-col lg:flex-row lg:justify-center flex-wrap w-full gap-10 my-10">
        {parts?.map((part) => (
          <div>
            <h1>{part.partName}</h1>
            <img alt="part of fish" src={part.partImage.asset.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parts;
