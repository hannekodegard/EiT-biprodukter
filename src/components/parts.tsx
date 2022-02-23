import React, { useState, useEffect } from "react";
import sanityClient from "../client";

interface IPart {
  title: string;
  partName: string;
  partDesc: string;
  partHist: string;
  partNutrition: string;
  partVideo: string;
  partImage: { asset: { _id: string; url: string } };
}

const Parts = () => {
  const [parts, setParts] = useState<IPart[]>();
  const specificPart = document.location.pathname.replace("/", "");

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
      .then((data) =>
        setParts(
          specificPart
            ? data.filter(
                (i: IPart) =>
                  i.partName.toLowerCase() === specificPart.toLowerCase()
              )
            : null
        )
      )
      .catch(console.error);
  }, [specificPart]);

  console.log(parts);
  return (
    <div className="">
      {parts && parts.length !== 0 ? (
        <div className="flex flex-col lg:flex-row lg:justify-center flex-wrap w-full ">
          {parts?.map((part) => (
            <div>
              <h1>{"Hva er " + part.partName}</h1>
              <img alt="part of fish" src={part.partImage.asset.url} />
              <p>{part.partDesc}</p>
              <p>{part.partHist}</p>
              <p>{part.partNutrition}</p>
              <p>{part.partVideo}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center h-40 bg-blue-500">
            <h1 className="text-white text-8xl">Den allsidige torsken</h1>
          </div>
          <div className="flex justify-center items-center mt-40">
            <div className="bg-[#8FA6D5] h-96 rounded-full w-3/5 absolute"></div>
            <img
              src="Torsk hel Lauritzen og Westhammer_700x383.png"
              useMap="#image-map"
              alt="interactive fish"
              className="z-10"
            />

            <map name="image-map">
              <area
                target=""
                alt="Hode"
                title="Hode"
                href="torskehode"
                coords="505,120,565,137,606,159,657,187,688,209,654,227,676,245,548,256,533,226,519,189"
                shape="poly"
                style={{ borderColor: "blue", borderRadius: "2px" }}
              />
              <area
                target=""
                alt="Rygg"
                title="Rygg"
                href="torskeryggen"
                coords="253,147,286,114,326,87,343,80,395,113,417,122,428,82,452,66,478,92,494,119,506,124,512,152,260,187"
                shape="poly"
              />
              <area
                target=""
                alt="Hale"
                title="Hale"
                href="torskehalen"
                coords="251,147,260,221,244,226,183,250,159,224,154,211,134,213,79,256,51,271,30,225,22,193,19,175,67,172,119,181,144,180,161,158,190,148"
                shape="poly"
              />
              <area
                target=""
                alt="Skinnet"
                title="Skinnet"
                href="torskeskinnet"
                coords="259,191,508,156,543,253,490,273,398,263,352,259,286,262,266,222"
                shape="poly"
              />
            </map>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parts;
