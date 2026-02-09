import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useSearchParams } from "react-router-dom";

const swCharacters = [
  { name: "Luke Skywalker", type: "Jedi" },
  { name: "Darth Vader", type: "Sith" },
  { name: "Emperor Palpatine", type: "Sith" },
  { name: "Yoda", type: "Jedi" }
]

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")


 // with this we can easily filter the characters down to just the ones we want to show based on the typeFiler.value. And then work with tha for rendering.
 
  let displayedCharacters = swCharacters
  if (typeFilter) {
	displayedCharacters = swCharacters.filter(char => char.type.toLowerCase() === typeFilter.toLowerCase())
}
console.log("displayedCharacters:", displayedCharacters)

    /**
   * Challenge: think how we might approach filtering the list of
   * characters down based on the typeFilter we grabbed from the
   * searchParams.
   *
   * Extra credit: try doing it yourself!
   */


  const charEls = swCharacters
    .map(char => (
      <div key={char.name}>
        <h3
          style={{ color: char.type.toLowerCase() === "jedi" ? "blue" : "red" }}
        >
          Name: {char.name}
        </h3>
        <p>Type: {char.type}</p>
        <hr />
      </div>
    ))

  return (
    <main>
      <h2>Home</h2>
      {charEls}
    </main>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/characters" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
