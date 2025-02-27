interface Props {
  handleGuess: (arg: string) => void;
}

const Keyboard = ({ handleGuess }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: "1rem",
      }}
    >
      <button onClick={() => handleGuess("a")}>A</button>
      <button onClick={() => handleGuess("b")}>B</button>
      <button onClick={() => handleGuess("c")}>C</button>
      <button onClick={() => handleGuess("d")}>D</button>
      <button onClick={() => handleGuess("e")}>E</button>
      <button onClick={() => handleGuess("f")}>F</button>
      <button onClick={() => handleGuess("g")}>G</button>
      <button onClick={() => handleGuess("h")}>H</button>
      <button onClick={() => handleGuess("i")}>I</button>
      <button onClick={() => handleGuess("j")}>J</button>
      <button onClick={() => handleGuess("k")}>K</button>
      <button onClick={() => handleGuess("l")}>L</button>
      <button onClick={() => handleGuess("m")}>M</button>
      <button onClick={() => handleGuess("n")}>N</button>
      <button onClick={() => handleGuess("o")}>O</button>
      <button onClick={() => handleGuess("p")}>P</button>
      <button onClick={() => handleGuess("q")}>Q</button>
      <button onClick={() => handleGuess("r")}>R</button>
      <button onClick={() => handleGuess("s")}>S</button>
      <button onClick={() => handleGuess("t")}>T</button>
      <button onClick={() => handleGuess("u")}>U</button>
      <button onClick={() => handleGuess("v")}>V</button>
      <button onClick={() => handleGuess("w")}>W</button>
      <button onClick={() => handleGuess("x")}>X</button>
      <button onClick={() => handleGuess("y")}>Y</button>
      <button onClick={() => handleGuess("z")}>Z</button>
    </div>
  );
};

export default Keyboard;
