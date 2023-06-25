import React from "react";

type Point = {
  x: number;
  y: number;
};

export type GridType = {
  N: number;
  M: number;
  points: Point[];
};

const Grid = ({ points, N, M }: GridType) => {
  const getColor = (x: number, y: number, points: Point[]) => {
    for (let point of points) {
      if (point.x === x && point.y === y) {
        return "red";
      }
    }
    return "white";
  };

  return (
    <div
      style={{
        width: "50rem",
        height: "50rem",
        rotate: "180deg",
        transform: "scaleX(-1)",
      }}
    >
      {new Array(N).fill("").map((_, y) => {
        return (
          <div style={{ display: "flex" }} key={y}>
            {new Array(N).fill("").map((_, x) => {
              return (
                <div
                  key={x}
                  onClick={(e) =>
                    (e.target as HTMLDivElement).style.backgroundColor ==
                    "green"
                      ? ((e.target as HTMLDivElement).style.backgroundColor =
                          "white")
                      : ((e.target as HTMLDivElement).style.backgroundColor =
                          "green")
                  }
                  style={{
                    backgroundColor: getColor(x, y, points),
                    border: "1px solid black",
                    height: "60px",
                    width: "60px",
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
