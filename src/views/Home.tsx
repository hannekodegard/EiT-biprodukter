import React from "react";

import Parts from "../components/parts";

const Home = () => {
  const specificPart = document.location.pathname.replace("/", "");
  return (
    <div className="w-full font-sans">
      {specificPart.length !== 0 ? (
        <Parts partName={specificPart} />
      ) : (
        <div className="h-screen">
          {/* <h1 className="text-white text-8xl">Den allsidige torsken</h1> */}

          <div
            className="flex flex-col items-center justify-center h-full pt-5"
            style={{
              backgroundImage: "url('background.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="flex items-center w-full justify-evenly">
              <h3 className="text-2xl text-white">Om oss</h3>
              <img src="Hvit logo.png" />
              <h3 className="text-2xl text-white">Oppskrifter</h3>
            </div>
            <div className="relative flex justify-center h-screen lg:w-3/5 md:w-full">
              <div className="">
                <img
                  src="Torsk hel Lauritzen og Westhammer_700x383.png"
                  alt="interactive fish"
                  className="h-full min-w-full z-2"
                />
                <a
                  className="absolute left-0 z-10 w-2/5 cursor-pointer h-2/5 bottom-1/4"
                  href="torskehalen"
                ></a>
                <a
                  href="torskeryggen"
                  className="cursor-pointer h-2/5 w-1/3 absolute left-[40%] bottom-1/2"
                ></a>
                <a
                  href="torskeskinnet"
                  className="cursor-pointer h-2/5 w-1/3 absolute left-[40%] top-1/2"
                ></a>
                <a
                  href="torskehode"
                  className="cursor-pointer h-1/2 w-1/4 absolute left-[75%]  bottom-1/4"
                ></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
