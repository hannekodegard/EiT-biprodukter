import React, { useState } from "react";

import Parts from "../components/parts";

const Home = () => {
  const specificPart = document.location.pathname.replace("/", "");
  const [inside, setInside] = useState<boolean>(false);
  return (
    <div className="w-full font-sans">
      {specificPart.length !== 0 ? (
        <Parts />
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
              <a href="about-us" className="text-2xl text-white">
                Om oss
              </a>
              <img src="Hvit logo.png" alt="logo" />
              <a href="/recipes" className="text-2xl text-white">
                Oppskrifter
              </a>
            </div>
            <div className="relative flex justify-center h-screen lg:w-3/5 md:w-full">
              <div className="">
                <img
                  src="Torsk hel Lauritzen og Westhammer_700x383.png"
                  alt="interactive fish"
                  className="relative h-full min-w-full z-2"
                />

                {inside ? (
                  <div>
                    <img
                      src="Melke.png"
                      alt="interactive fish"
                      className="absolute top-0 left-0 h-full min-w-full z-3"
                    />
                    <img
                      src="Lever.png"
                      alt="interactive fish"
                      className="absolute top-0 left-0 h-full min-w-full z-3"
                    />
                    <img
                      src="Svømmeblære.png"
                      alt="interactive fish"
                      className="absolute top-0 left-0 h-full min-w-full z-3"
                    />
                  </div>
                ) : null}

                <a
                  className="absolute left-0 z-10 w-2/5 cursor-pointer h-2/5 bottom-1/4"
                  href="/parts?part=torskehale"
                >
                  {""}
                </a>
                <a
                  href="/parts?part=torskerygg"
                  className="cursor-pointer h-2/5 w-1/3 absolute left-[40%] bottom-1/2"
                >
                  {""}
                </a>
                <a
                  href="/parts?part=torskeskinn"
                  className="cursor-pointer h-2/5 w-1/3 absolute left-[40%] top-1/2"
                >
                  {""}
                </a>
                <a
                  href="/parts?part=torskehode"
                  className="cursor-pointer h-1/2 w-1/4 absolute left-[75%]  bottom-1/4"
                >
                  {""}
                </a>

                {inside ? (
                  <div className="w-100" onClick={(e) => e.stopPropagation()}>
                    <a
                      href="/parts?part=svømmeblære"
                      className="z-20 absolute top-[40%] bottom-[53%] right-[36%] left-[38%]"
                    >
                      {""}
                    </a>
                    <a
                      href="/parts?part=torskemelke"
                      className="z-20 absolute top-[46%] bottom-[46%] right-[36%] left-[38%]"
                    >
                      {""}
                    </a>
                    <a
                      href="/parts?part=torskelever"
                      className="z-20 absolute top-[47%] bottom-[43%] right-[33%] left-[59%]"
                    >
                      {""}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <div
              onClick={() => setInside(!inside)}
              className="relative flex items-center justify-center w-full"
            >
              <div className="relative z-10 w-48 py-5 mx-auto my-10 text-xl text-center text-gray-800 uppercase bg-blue-500 cursor-pointer">
                <h1>{inside ? "Skjul involler" : "Vis involler"}</h1>
              </div>
              <div className="absolute z-0 w-48 h-20 mx-auto bg-gray-600 rotate-1"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
