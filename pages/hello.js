// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import Link from "next/link";
// import {
//   getPokemonId,
//   fuzzySearchResults,
//   createAnArrayOfAllNamesAndIds,
// } from "../../.vscode/functions/helper_functions";
// import { getAllPokemons } from "../../.vscode/functions/storage";
// import React, { useState, useEffect } from "react";
// import { useCookie } from "react-use";
// import PokemonSearch from "../../components/SearchComponent";
// import MiniCard from "../../components/MiniCard";
// import { GetServerSideProps } from "next";
// import Image from "next/image";
// import {
//   publicApi,
//   pokemonImgApi,
// } from "../../.vscode/functions/env_variables";
// import styles from "../../components/modules/pokedexMainPage.module.scss";

// interface PokemonsListFirstPage {
//   pokemons: { name: string; url: string }[];
//   pokemonsTypes: any[];
//   allNames: { name: string; url: string }[];
// }

// const PokemonsListFirstPage: React.FC<PokemonsListFirstPage> = ({
//   pokemons,
//   pokemonsTypes,
//   allNames,
// }) => {
//   const [page, updateCookie] = useCookie("pageNumber");
//   const [text, setText] = useState("");
//   const [route, setRoute] = useState<string | number>();
//   const [displayError, setDisplayError] = useState(false);
//   const pokemonImage: string = pokemonImgApi;
//   const pokemonsNamesAndTypes = {};
//   for (let i = 0; i < pokemonsTypes.length; i++) {
//     pokemonsNamesAndTypes[pokemonsTypes[i].name] =
//       pokemonsTypes[i].types[0].type.name;
//   }

//   const pagenumber = 1;

//   useEffect(() => {
//     updateCookie(pagenumber);
//   }, []);

//   const handlePokemonSearch = setRoute;

//   const handleOnChangeTextField = (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => {
//     if (e.target.value == "") {
//       setDisplayError(false);
//     }
//     setText(e.target.value);
//   };

//   const handleSubmit = (e: React.SyntheticEvent) => {
//     const arrayOfAllNamesAndIds = createAnArrayOfAllNamesAndIds(allNames);
//     if (route == null || !arrayOfAllNamesAndIds.includes(route.toLowerCase())) {
//       e.preventDefault();
//       return setDisplayError(true);
//     }

//     setDisplayError(false);
//   };

//   const pokemonsList = pokemons.map((pokemon) => {
//     const pokemonName: string =
//       pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
//     const pokemonId: number = getPokemonId(pokemon.url);
//     return (
//       <MiniCard
//         pokemon={pokemon}
//         pokemonId={pokemonId}
//         pokemonImage={pokemonImage}
//         pokemonName={pokemonName}
//         pokemonsNamesAndTypes={pokemonsNamesAndTypes}
//       />
//     );
//   });
//   return (
//     <div className={styles["pokemon-list-container"]}>
//       <div className={styles["pokedex-title"]}>
//         <Image
//           src="/pokeball-main-page.svg"
//           alt="pokeball-logo"
//           priority="true"
//           layout="responsive"
//           width="328"
//           height="32"
//         />
//       </div>
//       <PokemonSearch
//         result={fuzzySearchResults(allNames, text)}
//         route={route}
//         onSubmit={handleSubmit}
//         onChangeAutocomplete={handlePokemonSearch}
//         onChangeTextField={handleOnChangeTextField}
//         action={!displayError && `/pokedex/pokemon/${route}`.toLowerCase()}
//       />
//       <div className={styles["pokemon-cards-container"]}>
//         {displayError && (
//           <div className={styles["error-message"]}>
//             {" "}
//             Sorry, no Pokémon matched your search!
//           </div>
//         )}
//         {pokemonsList}
//       </div>
//       <div className={styles["next-btn-area"]}>
//         <Link href={`/pokedex/${page + 1}`} role="link">
//           <button role="button" className={styles["btn-next-prev"]}>
//             {" "}
//             <img
//               src="/chevron-right-black.svg"
//               className={styles["next-icon"]}
//             />{" "}
//           </button>
//         </Link>
//       </div>
//       <p className="copyright"> Design: Figma by Ricardo Schiniegoski</p>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const apiUrl = publicApi;
//   const data = await fetch(`${apiUrl}/pokemon?offset=0&limit=24`).then(
//     (response) => response.json()
//   );
//   const pokemons = data.results;
//   const allNames = await getAllPokemons();
//   const pokemonsTypes = [];
//   for (const { name } of pokemons) {
//     const data = await fetch(`${apiUrl}/pokemon/${name}`).then((response) =>
//       response.json()
//     );
//     pokemonsTypes.push(data);
//   }

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       pokemons,
//       pokemonsTypes,
//       allNames,
//     },
//   };
// };

// export default PokemonsListFirstPage;

// // export default function Home() {
// //   return (
// //     <div className={styles.container}>
// //       <Head>
// //         <title>Create Next App</title>
// //         <meta name="description" content="Generated by create next app" />
// //         <link rel="icon" href="/favicon.ico" />
// //       </Head>

// //       <main className={styles.main}>
// //         <h1 className={styles.title}>
// //           Welcome to <a href="https://nextjs.org">Next.js!</a>
// //         </h1>

// //         <p className={styles.description}>
// //           Get started by editing{" "}
// //           <code className={styles.code}>pages/index.js</code>
// //         </p>

// //         <div className={styles.grid}>
// //           <a href="https://nextjs.org/docs" className={styles.card}>
// //             <h2>Documentation &rarr;</h2>
// //             <p>Find in-depth information about Next.js features and API.</p>
// //           </a>

// //           <a href="https://nextjs.org/learn" className={styles.card}>
// //             <h2>Learn &rarr;</h2>
// //             <p>Learn about Next.js in an interactive course with quizzes!</p>
// //           </a>

// //           <a
// //             href="https://github.com/vercel/next.js/tree/canary/examples"
// //             className={styles.card}
// //           >
// //             <h2>Examples &rarr;</h2>
// //             <p>Discover and deploy boilerplate example Next.js projects.</p>
// //           </a>

// //           <a
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// //             className={styles.card}
// //           >
// //             <h2>Deploy &rarr;</h2>
// //             <p>
// //               Instantly deploy your Next.js site to a public URL with Vercel.
// //             </p>
// //           </a>
// //         </div>
// //       </main>

// //       <footer className={styles.footer}>
// //         <a
// //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Powered by{" "}
// //           <span className={styles.logo}>
// //             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
// //           </span>
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
