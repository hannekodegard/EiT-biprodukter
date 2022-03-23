import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  recipeImage: { asset: { _id: string; url: string } };
  recipeVideo: string;
  recipePart: string;
  recipeIngredients: {
    ingredientsName: string;
    quantity: string;
    unit: string;
  };
}

interface Part {
  partName: string;
}

const Parts = ({ partName }: Part) => {
  const [part, setParts] = useState<IPart | string>("Loading");
  const [recipes, setRecipes] = useState<IRecipe[]>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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
      .then((data) =>
        setParts(
          partName
            ? data.filter(
                (i: IPart) =>
                  i.partName.toLowerCase() === partName.toLowerCase()
              )[0]
            : null
        )
      )
      .catch(() => setParts(""));
  }, [partName]);

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
              recipe.recipePart.toUpperCase() === partName.toUpperCase()
          )
        )
      )
      .catch(() => setRecipes([]));
  }, [partName]);

  console.log(part);
  console.log(recipes);

  return (
    <div className="">
      {part === "Loading" ? <h1>Laster</h1> : <></>}
      {part && typeof part === "object" ? (
        <div className="flex flex-col items-center w-full pt-5">
          <img src="Svart logo.png" alt="logo" />

          <div className="flex flex-wrap w-full mb-52 lg:justify-center ">
            <div className="w-1/2">
              <svg
                width="430"
                height="274"
                viewBox="0 0 430 274"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.905 35.5888C87.2836 43.6771 108.031 63.7568 124.664 120.175C164.636 202.958 203.568 189.706 270.494 175.141C347.55 180.44 360.828 204.161 377.344 251.44"
                  stroke="white"
                  strokeWidth="20"
                />
                <path
                  d="M39.2961 22.982L32.9212 50.6957L29.3047 49.8639L35.6796 22.1501L39.2961 22.982ZM48.2041 25.031L47.5123 28.0384L26.0988 23.1128L26.7906 20.1054L48.2041 25.031Z"
                  fill="black"
                />
                <path
                  d="M74.5264 48.4297L74.8342 48.1026C75.8782 46.9931 77.0076 46.116 78.2224 45.4711C79.446 44.8168 80.6914 44.4243 81.9586 44.2937C83.2348 44.1536 84.4872 44.2952 85.716 44.7184C86.9536 45.1322 88.1082 45.8432 89.1798 46.8516C90.2608 47.8688 91.0453 48.9826 91.5334 50.1929C92.04 51.4026 92.2621 52.6486 92.1997 53.9309C92.1557 55.2126 91.8443 56.484 91.2655 57.7451C90.6955 58.9968 89.8886 60.1773 88.8445 61.2868L88.5367 61.6139C87.4927 62.7234 86.3633 63.6005 85.1485 64.2454C83.9338 64.8902 82.6836 65.2782 81.398 65.4094C80.1308 65.54 78.8784 65.3984 77.6407 64.9847C76.4214 64.5704 75.2713 63.8546 74.1903 62.8373C73.1093 61.8201 72.3203 60.711 71.8232 59.5102C71.3351 58.2999 71.113 57.0539 71.157 55.7722C71.2194 54.49 71.5355 53.223 72.1054 51.9714C72.6754 50.7197 73.4823 49.5392 74.5264 48.4297ZM77.4656 50.5788L77.1577 50.906C76.435 51.674 75.8424 52.4842 75.3801 53.3365C74.9267 54.1793 74.6348 55.031 74.5043 55.8916C74.3834 56.7612 74.4551 57.6064 74.7195 58.4274C74.9929 59.2389 75.4947 59.9882 76.2248 60.6753C76.9455 61.3535 77.7144 61.7999 78.5315 62.0146C79.367 62.2287 80.2103 62.2445 81.0615 62.0621C81.9126 61.8796 82.745 61.5365 83.5587 61.0328C84.3908 60.5286 85.1683 59.8924 85.8911 59.1243L86.1989 58.7972C86.9128 58.0386 87.4917 57.2334 87.9356 56.3817C88.3979 55.5294 88.6895 54.6685 88.8105 53.799C88.9499 52.9289 88.8873 52.0833 88.6229 51.2623C88.3679 50.4503 87.8754 49.7007 87.1452 49.0136C86.4246 48.3354 85.6465 47.8893 84.811 47.6752C83.9849 47.47 83.1371 47.4589 82.2676 47.6419C81.4165 47.8243 80.5796 48.1722 79.757 48.6853C78.9433 49.1891 78.1795 49.8202 77.4656 50.5788Z"
                  fill="black"
                />
                <path
                  d="M116.58 86.0229L100.002 92.5396L98.6803 89.1768L118.348 81.4453L119.634 84.7172L116.58 86.0229ZM122.194 90.9092L119.061 92.12C119.012 91.8175 118.943 91.5366 118.855 91.2773C118.784 91.0254 118.687 90.742 118.563 90.4269C118.258 89.6513 117.868 89.0143 117.392 88.5158C116.916 88.0173 116.379 87.6477 115.781 87.4072C115.183 87.1667 114.533 87.0443 113.832 87.0402C113.147 87.0433 112.434 87.1491 111.69 87.3574L110.773 86.6266C111.961 86.1598 113.121 85.8366 114.253 85.6572C115.391 85.4899 116.457 85.4974 117.452 85.6799C118.46 85.8576 119.337 86.24 120.086 86.8272C120.851 87.4217 121.444 88.2522 121.863 89.3186C121.958 89.561 122.037 89.8516 122.101 90.1905C122.176 90.5246 122.207 90.7642 122.194 90.9092Z"
                  fill="black"
                />
                <path
                  d="M122.54 134.767C122.989 134.503 123.345 134.157 123.607 133.73C123.887 133.308 124.006 132.702 123.963 131.911C123.938 131.125 123.689 130.062 123.217 128.723C122.835 127.588 122.549 126.525 122.358 125.534C122.174 124.554 122.12 123.656 122.198 122.839C122.283 122.034 122.516 121.315 122.898 120.681C123.281 120.048 123.848 119.509 124.599 119.066C125.317 118.643 126.088 118.4 126.913 118.338C127.744 118.286 128.578 118.406 129.416 118.699C130.26 119.002 131.066 119.487 131.836 120.151C132.606 120.816 133.292 121.659 133.893 122.68C134.753 124.138 135.229 125.535 135.321 126.871C135.413 128.208 135.189 129.405 134.65 130.464C134.121 131.516 133.335 132.349 132.292 132.964L130.457 129.851C130.962 129.554 131.361 129.115 131.653 128.534C131.964 127.958 132.107 127.292 132.084 126.535C132.068 125.789 131.818 125.006 131.336 124.187C130.827 123.323 130.279 122.702 129.692 122.322C129.123 121.947 128.564 121.755 128.015 121.746C127.472 121.749 126.977 121.882 126.528 122.146C126.192 122.345 125.922 122.579 125.719 122.85C125.533 123.126 125.418 123.481 125.372 123.916C125.337 124.345 125.387 124.89 125.52 125.552C125.653 126.214 125.876 127.027 126.188 127.992C126.73 129.683 127.051 131.149 127.148 132.391C127.245 133.634 127.091 134.692 126.684 135.567C126.278 136.441 125.587 137.166 124.611 137.741C123.814 138.21 122.986 138.472 122.126 138.525C121.272 138.59 120.419 138.451 119.566 138.107C118.732 137.768 117.925 137.245 117.147 136.54C116.386 135.84 115.692 134.957 115.064 133.891C114.119 132.287 113.605 130.761 113.522 129.314C113.44 127.866 113.684 126.588 114.256 125.481C114.827 124.373 115.617 123.522 116.627 122.927L118.472 126.056C117.646 126.604 117.112 127.25 116.872 127.997C116.643 128.736 116.614 129.494 116.784 130.27C116.965 131.04 117.245 131.744 117.622 132.384C118.124 133.236 118.656 133.882 119.218 134.322C119.786 134.773 120.355 135.035 120.926 135.106C121.498 135.178 122.036 135.065 122.54 134.767Z"
                  fill="black"
                />
                <path
                  d="M160.138 151.45L143.25 176.245L140.248 174.2L157.136 149.405L160.138 151.45ZM165.817 166.046L152.645 169.008L145.371 170.529L147.295 167.184L152.831 165.614L162.169 163.561L165.817 166.046ZM151.193 181.654L150.635 169.081L153.999 167.472L154.712 184.051L151.193 181.654Z"
                  fill="black"
                />
                <path
                  d="M199.332 200.873C197.864 200.963 196.517 200.798 195.29 200.378C194.077 199.944 193.013 199.298 192.099 198.441C191.199 197.583 190.482 196.545 189.951 195.325C189.419 194.105 189.108 192.755 189.017 191.273L188.967 190.454C188.861 188.739 189.021 187.196 189.445 185.826C189.869 184.444 190.488 183.258 191.301 182.268C192.114 181.279 193.058 180.51 194.133 179.961C195.209 179.413 196.337 179.102 197.52 179.029C199.028 178.937 200.343 179.117 201.467 179.569C202.604 180.021 203.552 180.694 204.311 181.586C205.069 182.466 205.656 183.526 206.072 184.765C206.486 185.992 206.739 187.346 206.83 188.828L206.93 190.446L191.178 191.414L190.997 188.471L203.142 187.724L203.125 187.451C203.016 186.519 202.765 185.621 202.373 184.758C201.994 183.894 201.429 183.198 200.679 182.67C199.929 182.142 198.937 181.916 197.702 181.992C196.883 182.043 196.14 182.264 195.473 182.658C194.805 183.038 194.245 183.581 193.793 184.287C193.34 184.993 193.008 185.842 192.795 186.834C192.582 187.825 192.514 188.958 192.593 190.232L192.643 191.05C192.704 192.051 192.899 192.985 193.226 193.852C193.566 194.705 194.022 195.447 194.596 196.077C195.182 196.706 195.87 197.185 196.66 197.515C197.463 197.844 198.359 197.978 199.346 197.918C200.62 197.839 201.683 197.513 202.535 196.939C203.386 196.365 204.117 195.622 204.726 194.71L207.016 196.311C206.604 197.028 206.066 197.72 205.402 198.387C204.739 199.054 203.906 199.614 202.903 200.067C201.913 200.519 200.723 200.788 199.332 200.873Z"
                  fill="black"
                />
                <path
                  d="M238.895 165.657L245.373 194.949L241.845 195.729L235.367 166.437L238.895 165.657ZM242.08 184.035L240.599 184.303C240.299 182.889 240.221 181.539 240.363 180.254C240.503 178.957 240.843 177.781 241.384 176.728C241.924 175.675 242.65 174.795 243.56 174.087C244.48 173.363 245.563 172.863 246.809 172.588C247.826 172.363 248.773 172.3 249.648 172.4C250.521 172.487 251.309 172.766 252.014 173.237C252.731 173.706 253.347 174.383 253.863 175.269C254.376 176.142 254.783 177.259 255.084 178.619L258.074 192.14L254.527 192.925L251.529 179.366C251.29 178.285 250.939 177.455 250.478 176.877C250.014 176.287 249.445 175.912 248.77 175.755C248.092 175.585 247.308 175.598 246.418 175.795C245.541 175.989 244.781 176.35 244.138 176.879C243.507 177.405 243.003 178.05 242.625 178.814C242.26 179.575 242.024 180.407 241.917 181.311C241.82 182.199 241.874 183.107 242.08 184.035Z"
                  fill="black"
                />
                <path
                  d="M287.456 178.694L287.566 178.259C287.937 176.781 288.497 175.465 289.243 174.31C289.994 173.143 290.89 172.193 291.933 171.462C292.98 170.718 294.142 170.232 295.422 170.003C296.704 169.762 298.059 169.821 299.486 170.179C300.925 170.541 302.153 171.132 303.169 171.951C304.2 172.761 305.001 173.741 305.571 174.892C306.157 176.033 306.504 177.295 306.613 178.678C306.725 180.049 306.595 181.473 306.223 182.95L306.114 183.386C305.742 184.863 305.183 186.179 304.436 187.334C303.689 188.489 302.786 189.437 301.727 190.177C300.684 190.909 299.521 191.395 298.239 191.636C296.972 191.868 295.619 191.803 294.179 191.441C292.74 191.079 291.511 190.495 290.492 189.688C289.476 188.869 288.675 187.889 288.089 186.748C287.519 185.598 287.178 184.337 287.067 182.966C286.955 181.596 287.085 180.172 287.456 178.694ZM291.07 179.14L290.96 179.575C290.703 180.598 290.58 181.594 290.592 182.564C290.606 183.521 290.766 184.407 291.071 185.222C291.389 186.04 291.863 186.744 292.494 187.332C293.128 187.908 293.931 188.318 294.903 188.562C295.863 188.804 296.752 188.819 297.57 188.609C298.404 188.389 299.149 187.992 299.803 187.418C300.458 186.844 301.018 186.139 301.483 185.303C301.964 184.457 302.333 183.523 302.591 182.5L302.7 182.064C302.954 181.054 303.068 180.069 303.041 179.109C303.029 178.139 302.865 177.245 302.547 176.427C302.245 175.599 301.778 174.891 301.148 174.303C300.529 173.718 299.734 173.303 298.762 173.058C297.802 172.817 296.905 172.806 296.071 173.026C295.25 173.249 294.504 173.653 293.834 174.236C293.179 174.81 292.618 175.521 292.149 176.37C291.684 177.206 291.324 178.129 291.07 179.14Z"
                  fill="black"
                />
                <path
                  d="M341.393 204.975L361.265 188.367L363.594 191.154L340.576 210.393L338.446 207.845L341.393 204.975ZM337.055 190.07L337.37 189.807C338.609 188.771 339.858 187.982 341.118 187.438C342.395 186.896 343.633 186.6 344.83 186.55C346.035 186.51 347.158 186.717 348.199 187.17C349.258 187.626 350.193 188.338 351.003 189.307C351.855 190.326 352.418 191.365 352.693 192.425C352.986 193.487 353.015 194.566 352.778 195.664C352.559 196.763 352.105 197.864 351.415 198.967C350.724 200.07 349.83 201.182 348.731 202.304L347.353 203.456C346.072 204.34 344.823 205.019 343.607 205.492C342.399 205.976 341.235 206.228 340.114 206.248C339.003 206.278 337.945 206.058 336.943 205.59C335.95 205.112 335.024 204.359 334.164 203.33C333.37 202.381 332.849 201.341 332.599 200.209C332.357 199.088 332.368 197.933 332.631 196.746C332.903 195.568 333.409 194.407 334.149 193.263C334.907 192.119 335.876 191.055 337.055 190.07ZM339.7 192.594L339.385 192.857C338.576 193.534 337.883 194.248 337.307 195.001C336.74 195.764 336.333 196.545 336.085 197.346C335.838 198.146 335.785 198.946 335.926 199.744C336.078 200.534 336.466 201.304 337.093 202.053C337.861 202.972 338.686 203.564 339.568 203.828C340.459 204.101 341.374 204.151 342.314 203.976C343.254 203.802 344.183 203.501 345.099 203.074L348.71 200.056C349.16 199.477 349.543 198.859 349.861 198.204C350.196 197.55 350.414 196.876 350.513 196.182C350.63 195.49 350.592 194.784 350.397 194.064C350.211 193.354 349.826 192.65 349.241 191.95C348.607 191.191 347.9 190.67 347.121 190.388C346.36 190.107 345.559 190.022 344.717 190.131C343.886 190.233 343.039 190.499 342.178 190.93C341.335 191.363 340.509 191.918 339.7 192.594Z"
                  fill="black"
                />
                <path
                  d="M359.104 242.701C358.617 241.313 358.409 239.971 358.479 238.677C358.566 237.391 358.897 236.191 359.472 235.079C360.052 233.978 360.856 233.006 361.885 232.162C362.914 231.318 364.128 230.651 365.529 230.159L366.303 229.888C367.925 229.318 369.452 229.051 370.886 229.087C372.332 229.117 373.642 229.389 374.815 229.902C375.989 230.415 376.986 231.114 377.807 231.998C378.628 232.883 379.235 233.885 379.627 235.003C380.127 236.428 380.312 237.743 380.183 238.947C380.058 240.164 379.67 241.259 379.018 242.233C378.378 243.203 377.519 244.056 376.439 244.794C375.372 245.527 374.138 246.14 372.737 246.631L371.207 247.168L365.982 232.277L368.765 231.3L372.794 242.782L373.052 242.692C373.919 242.332 374.715 241.846 375.438 241.233C376.166 240.633 376.681 239.9 376.985 239.035C377.288 238.169 377.235 237.153 376.826 235.986C376.554 235.212 376.138 234.557 375.578 234.022C375.03 233.483 374.355 233.092 373.552 232.85C372.749 232.607 371.842 232.518 370.83 232.584C369.818 232.649 368.71 232.893 367.506 233.315L366.732 233.587C365.786 233.919 364.94 234.361 364.195 234.912C363.467 235.471 362.878 236.112 362.428 236.836C361.982 237.572 361.709 238.365 361.607 239.215C361.509 240.077 361.624 240.975 361.952 241.909C362.374 243.113 362.978 244.046 363.762 244.709C364.547 245.372 365.461 245.873 366.504 246.21L365.588 248.85C364.786 248.649 363.974 248.32 363.151 247.863C362.329 247.407 361.563 246.758 360.853 245.916C360.149 245.087 359.566 244.016 359.104 242.701Z"
                  fill="black"
                />
              </svg>

              <img
                alt="part of fish"
                src="torskehode.png"
                className="w-full max-w-lg mt-0 "
              />
            </div>
            <div className="w-1/2 px-40 mt-48">
              <h1 className="pb-6 text-5xl">{"Hva er " + part.partName}</h1>
              <h1 className="py-6 text-5xl">Bruksområde før og nå</h1>
              <h1 className="py-6 text-5xl">Næringsinnhold</h1>
              <h1 className="pt-6 text-5xl">Oppskrifter</h1>
            </div>
          </div>
          <div className="left-0 w-4/5">
            <h1 className="text-5xl mb-14">{"Hva er " + part.partName}</h1>
            <p>
              {part.partDesc}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
              molestie augue. Fusce mattis at tortor vel lobortis. Sed efficitur
              venenatis mi non dignissim. Fusce lobortis ex eget magna faucibus,
              ac egestas nisl tempor. Curabitur eleifend velit felis, ultricies
              finibus leo imperdiet sed. Aliquam hendrerit arcu vitae mi cursus,
              nec maximus felis sagittis. Nulla aliquet risus nec lectus
              euismod, ac volutpat nisl dictum. Suspendisse eu fringilla nulla,
              eget pharetra odio. Proin bibendum nunc vel nisl aliquet, quis
              maximus erat faucibus. Aenean eleifend bibendum ante, nec eleifend
              augue posuere elementum. Vivamus mauris metus, cursus non risus
              quis, gravida consectetur risus. Praesent in lectus eu ante
              efficitur mattis. Etiam accumsan arcu eget tortor rhoncus
              condimentum. Integer vitae mi in metus vulputate euismod vitae ut
              ligula. Etiam auctor dictum tortor eu consectetur.
            </p>
          </div>
          <div className="self-end w-4/5">
            <h1 className="mt-40 text-5xl mb-14">Bruksområde før og nå</h1>
            <p>
              {part.partHist} + Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Donec a molestie augue. Fusce mattis at tortor
              vel lobortis. Sed efficitur venenatis mi non dignissim. Fusce
              lobortis ex eget magna faucibus, ac egestas nisl tempor. Curabitur
              eleifend velit felis, ultricies finibus leo imperdiet sed. Aliquam
              hendrerit arcu vitae mi cursus, nec maximus felis sagittis. Nulla
              aliquet risus nec lectus euismod, ac volutpat nisl dictum.
              Suspendisse eu fringilla nulla, eget pharetra odio. Proin bibendum
              nunc vel nisl aliquet, quis maximus erat faucibus. Aenean eleifend
              bibendum ante, nec eleifend augue posuere elementum. Vivamus
              mauris metus, cursus non risus quis, gravida consectetur risus.
              Praesent in lectus eu ante efficitur mattis. Etiam accumsan arcu
              eget tortor rhoncus condimentum. Integer vitae mi in metus
              vulputate euismod vitae ut ligula. Etiam auctor dictum tortor eu
              consectetur.
            </p>
          </div>
          <div className="left-0 w-4/5">
            <h1 className="mt-40 text-5xl mb-14">Næringsinnhold</h1>
            <p>
              {part.partNutrition}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
              molestie augue. Fusce mattis at tortor vel lobortis. Sed efficitur
              venenatis mi non dignissim. Fusce lobortis ex eget magna faucibus,
              ac egestas nisl tempor. Curabitur eleifend velit felis, ultricies
              finibus leo imperdiet sed. Aliquam hendrerit arcu vitae mi cursus,
              nec maximus felis sagittis. Nulla aliquet risus nec lectus
              euismod, ac volutpat nisl dictum. Suspendisse eu fringilla nulla,
              eget pharetra odio. Proin bibendum nunc vel nisl aliquet, quis
              maximus erat faucibus. Aenean eleifend bibendum ante, nec eleifend
              augue posuere elementum. Vivamus mauris metus, cursus non risus
              quis, gravida consectetur risus. Praesent in lectus eu ante
              efficitur mattis. Etiam accumsan arcu eget tortor rhoncus
              condimentum. Integer vitae mi in metus vulputate euismod vitae ut
              ligula. Etiam auctor dictum tortor eu consectetur.
            </p>
          </div>
          <div className="w-full my-20 text-">
            <h1>Oppskrifter</h1>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {recipes?.map((recipe) => {
                return (
                  <div className="px-5">
                    <img
                      alt="recipe"
                      className="w-full h-48"
                      src={recipe.recipeImage.asset.url}
                    />
                    <h3>{recipe.recipeName}</h3>
                  </div>
                );
              })}
            </Carousel>
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
