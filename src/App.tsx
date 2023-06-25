import { useState, useEffect } from "react";
import "./App.css";
import { getMiniZinc } from "./solver";
import Grid, { GridType } from "./Grid";
function App() {
 
  
  const [solution, setSolution] = useState("");
  const [data, setData] = useState<GridType>({
    N: 0,
    M: 0,
    points: [],
  });
  return (
    <main
      style={{
        padding: "2rem",
        gap: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form
        style={{ display: "flex", alignItems: "center", gap:"1rem" }}
        onSubmit={ async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const text = (form.get("params") as string).split("\n");
          const [N, M, ...rest] = text;
          for (let text of rest) {
            if (text === "") {
              return alert("Error en los parametros");
            }
          }
          if (!N || !M || rest.length == 0)
            return alert("Error en los parametros");

          const solution= getMiniZinc(N, M, rest);
          setData({
            N: parseInt(N),
            M: parseInt(M),
            points: rest.map((text) => {
              const [_, x, y] = text.split(" ");
              return { x: parseInt(x), y: parseInt(y) };
            }),
          });
          setSolution(solution);
        }}
      >
        <textarea
          style={{ width: "34rem", height: "10rem" }}
          name="params"
          defaultValue={`12
5
Palmira 2 3
Cali 10 2
Buga 11 0
Tulua 0 3
RioFrio 1 2`}
          placeholder="Enter params"
        ></textarea>
        <button type="submit">Solucionar</button>
        <textarea style={{ width: "34rem", height: "10rem" }} defaultValue={solution}>

        </textarea>
      </form>
      <img src="https://github.com/Alifend/portfolio/assets/47732101/71dd04ef-4aec-4139-a4b3-e8d2174b0fbf" />
      {solution !== "" && <Grid {...data} />}
    </main>
  );
}

export default App;
