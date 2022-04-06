import { useEffect, useState } from "react";
import sanityClient from "../client";
import Papa from "papaparse";
import { Url } from "url";

interface IRecipe {
    recipeName: string;
    recipeDesc: string;
    recipeToDo: string;
    recipePart: string;
    recipeIngredients: {
        ingredientsName: string;
        quantity: string;
        unit: string; 
    };
    recipeImage: { asset: { _id: string; url: string } }[];
    recipeVideo: Url;
}

//const queryString = window.location.search;
//const urlParams = new URLSearchParams(queryString);
//const code = urlParams.get('code')
//console.log(code);

const Recipe = () => {
    const [recipes, getRecipe] = useState<IRecipe[]>([]);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "recipes"]{
                    recipeName,
                    recipeDesc,
                    recipeToDo, 
                    recipePart, 
                    recipeIngredients[] {
                        ingredientName, 
                        unity,
                        quantity
                    },
                    recipeImage[]{
                        asset->{
                            _id,
                            url
                        },
                    },
                    recipeVideo,
                }`
            )
            .then((data) => getRecipe(data))
            .catch(() => getRecipe([]));
    }, []);

    console.log(recipes)

    let codHead = recipes[0]
    useEffect(() => {
        codHead = recipes[0]
    }, [recipes])
    
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

        <div>
            <h3>
                {codHead.recipeName}
            </h3>
        </div>


    </div>
    );
};

export default Recipe;