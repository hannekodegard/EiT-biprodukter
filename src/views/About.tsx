import { useEffect, useState } from "react";
import Papa from "papaparse";
import Fisk from "../Fisk.png";

interface IPerson {
  name: string;
  age: string;
  studies: string;
  about: string;
}
const About = () => {
  const [data, setData] = useState<IPerson[]>([]);
  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXPizC0uChp93m9UbwdTx8hBRt-nVNkxivIh_F9BjLPjTX-cypEBBk4UFUyTCiTVS_MxWj2baw7ZYl/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results: any) => {
          setData(results.data);
        },
      }
    );
  }, []);
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center px-48">
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

      <div className="relative py-10 my-10">
        <img src={Fisk} alt="fisk" />
        <p style={styles.aboutInfo} className="absolute top-0 text-2xl">
          {" "}
          Velkommen, dette er oss. Vi er 7 studenter som skal skape fremtidens
          mat ved hjelp av biprodukter. Dette gjør vi gjennom EiT, et prosjekt
          med fokus på tverrfaglig samarbeid.
        </p>
      </div>

      <div className="">
        {data.map((person, i) => {
          console.log(person.name.split(" ")[0]);
          return (
            <div className="flex mb-36">
              {i % 2 === 0 ? (
                <div className="flex">
                  <img
                    className="h-56 w-56 object-cover mr-9"
                    src={person.name.split(" ")[0] + ".png"}
                    alt={person.name}
                  />
                  <p className="text-2xl">{person.about}</p>
                </div>
              ) : (
                <div className="flex w-full justify-end">
                  <p className="text-2xl">{person.about}</p>
                  <img
                    src={person.name.split(" ")[0] + ".png"}
                    alt={person.name}
                    className="h-56 w-56 object-cover ml-9"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  aboutInfo: {
    width: 700,
    padding: "5em 0em 5em 0em",
    textAlign: "center",
  },
} as const;

export default About;
