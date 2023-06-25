
export const getMiniZinc = (N: string, M: string, ciudades: string[]) => {
  const output = `
var int: x; % Coordenada x
var int: y; % Coordenada y
var int: z; 

%No negatividad
constraint x >= 0;
constraint y >= 0;
constraint x <= ${N};
constraint y <= ${N};
constraint ${getRestrictions(ciudades)};

${getDistances(ciudades)}

${getOptimization(ciudades)};

solve minimize z;

output["Coordenada x: ", show(x), " |Coordenada y: ", show(y), " |Coeficiente mínima: ", show(z)];
  `;

  return output;
};

const getRestrictions = (ciudades: string[]) => {
  return ciudades
    .map((ciudad) => {
      const [_, x, y] = ciudad.split(" ");
      return `( x != ${x} \\/ y != ${y} )`;
    })
    .join(` /\\ `);
};

const getDistances = (ciudades: string[]) => {
  return ciudades
    .map((ciudad, index) => {
      const [_, x, y] = ciudad.split(" ");
      return `var int: x${index + 1} = pow(abs(${x}-x) + abs(${y}-y),2);`;
    })
    .join("\n");
};

const getOptimization = (ciudades: string[]) => {
  return (
    "constraint z = " + ciudades.map((_, index) => `x${index + 1}`).join(" + ")
  );
};



