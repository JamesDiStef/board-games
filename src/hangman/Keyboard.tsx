interface Props {
  handleGuess: (arg: string) => void;
  guessedLetters: string[];
  wordToGuess: string;
}

const alphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard = ({ guessedLetters, handleGuess, wordToGuess }: Props) => {
  return (
    <div className="grid gap-1.5 justify-center w-full h-full overflow-y-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(36px, 1fr))" }}>
      {alphabet.map((letter) => {
        const isWrong = guessedLetters.includes(letter) && !wordToGuess.includes(letter);
        const isCorrect = guessedLetters.includes(letter) && wordToGuess.includes(letter);
        const isGuessed = guessedLetters.includes(letter);
        
        return (
          <button
            key={letter}
            disabled={isGuessed}
            onClick={() => handleGuess(letter)}
            className={`
              h-9 font-bold text-xs rounded-lg transition-all duration-200 uppercase aspect-square
              ${isWrong ? 'bg-red-500 text-white cursor-not-allowed' : 
                isCorrect ? 'bg-green-500 text-white cursor-not-allowed' :
                isGuessed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                'bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 active:bg-amber-100 cursor-pointer shadow-sm hover:shadow-md'
              }
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
