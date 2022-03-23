import { useEffect, useState } from "react";
import Papa from "papaparse";

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-around w-full mt-5">
        <a href="about-us" className="text-2xl text-black">
          Om oss
        </a>
        <img src="Svart logo.png" alt="logo" />
        <h3 className="text-2xl text-black">Oppskrifter</h3>
      </div>

      <div>
        <p style={styles.aboutInfo}> Velkommen, dette er oss. Vi er 7 studenter som skal skape fremtidens mat ved hjelp av biprodukter. Dette gjør vi gjennom EiT, et prosjekt med fokus på tverrfaglig samarbeid.</p>
      </div>
      
      <div className="grid mt-10 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4">
        {data.map((person) => {
          return (
            <div>
              <div className="relative w-80">
                <img
                  alt="team member"
                  className="w-80 h-80 object-cover"
                  src={`${person.name.split(" ")[0]}.png`}
                />
                <div className="bg-blue-100  text-center">
                  <h3 className="text-blue-600 font-bold uppercase">
                    {person.name}
                  </h3>
                  <p className="text-blue-500 font-bold">{person.age}</p>
                  <p className="text-black">{person.studies}</p>
                </div>
                <p className="p-5 absolute top-0 h-full w-full bg-blue-400 opacity-0 text-white flex hover:opacity-80 justify-center overflow-y-auto">
                  {person.about}
                </p>
              </div>
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
    padding: '5em 0em 5em 0em',
    textAlign: 'center',
  },
} as const;

export default About;
