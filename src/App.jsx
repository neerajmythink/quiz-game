import { useEffect, useMemo, useRef, useState } from "react";

const pictures = [
  ["A", "Apple", "🍎"], ["B", "Ball", "⚽"], ["C", "Cat", "🐱"], ["D", "Dog", "🐶"],
  ["E", "Elephant", "🐘"], ["F", "Fish", "🐠"], ["G", "Grapes", "🍇"], ["H", "House", "🏠"],
  ["I", "Ice cream", "🍦"], ["J", "Juice", "🧃"], ["K", "Kite", "🪁"], ["L", "Lion", "🦁"],
  ["M", "Moon", "🌙"], ["N", "Nest", "🪺"], ["O", "Owl", "🦉"], ["P", "Pizza", "🍕"],
  ["Q", "Queen", "👑"], ["R", "Rainbow", "🌈"], ["S", "Sun", "☀️"], ["T", "Turtle", "🐢"],
  ["U", "Umbrella", "☂️"], ["V", "Van", "🚐"], ["W", "Whale", "🐳"], ["X", "Xylophone", "🎵"],
  ["Y", "Yoyo", "🪀"], ["Z", "Zebra", "🦓"],
].map(([letter, word, emoji]) => ({ letter, word, emoji }));

const mathThings = [
  ["apples", "🍎"], ["balls", "⚽"], ["cats", "🐱"], ["ducks", "🦆"], ["fish", "🐠"],
  ["flowers", "🌼"], ["stars", "⭐"], ["frogs", "🐸"], ["cookies", "🍪"], ["butterflies", "🦋"],
].map(([word, emoji]) => ({ word, emoji }));

const hindiPictures = [
  ["अ", "अनार", "🍎"], ["आ", "आम", "🥭"], ["इ", "इमली", "🌿"], ["उ", "उल्लू", "🦉"],
  ["ऊ", "ऊन", "🧶"], ["क", "कमल", "🪷"], ["ख", "खरगोश", "🐇"], ["ग", "गमला", "🪴"],
  ["घ", "घर", "🏠"], ["च", "चम्मच", "🥄"], ["छ", "छाता", "☂️"], ["ज", "जहाज", "🚢"],
  ["ट", "टमाटर", "🍅"], ["ड", "डमरू", "🥁"], ["त", "तरबूज", "🍉"], ["न", "नल", "🚰"],
  ["प", "पतंग", "🪁"], ["फ", "फल", "🍐"], ["ब", "बतख", "🦆"], ["भ", "भालू", "🐻"],
  ["म", "मछली", "🐟"], ["र", "रथ", "🛺"], ["ल", "लड्डू", "🍡"], ["ह", "हाथी", "🐘"],
].map(([letter, word, emoji]) => ({ letter, word, emoji }));

const spellingWords = [
  { word: "cat", emoji: "🐱", missingIndex: 1, choices: ["a", "e", "i"] },
  { word: "dog", emoji: "🐶", missingIndex: 1, choices: ["o", "a", "i"] },
  { word: "sun", emoji: "☀️", missingIndex: 1, choices: ["u", "a", "e"] },
  { word: "bus", emoji: "🚌", missingIndex: 1, choices: ["u", "a", "i"] },
  { word: "hat", emoji: "👒", missingIndex: 1, choices: ["a", "e", "i"] },
  { word: "hen", emoji: "🐔", missingIndex: 1, choices: ["e", "a", "i"] },
  { word: "pig", emoji: "🐷", missingIndex: 1, choices: ["i", "e", "o"] },
  { word: "cup", emoji: "🥤", missingIndex: 1, choices: ["u", "a", "o"] },
  { word: "bed", emoji: "🛏️", missingIndex: 1, choices: ["e", "a", "i"] },
  { word: "fox", emoji: "🦊", missingIndex: 1, choices: ["o", "a", "e"] },
  { word: "jam", emoji: "🍯", missingIndex: 1, choices: ["a", "e", "i"] },
  { word: "map", emoji: "🗺️", missingIndex: 1, choices: ["a", "e", "o"] },
  { word: "pen", emoji: "🖊️", missingIndex: 1, choices: ["e", "a", "i"] },
  { word: "leg", emoji: "🦵", missingIndex: 1, choices: ["e", "a", "i"] },
  { word: "pot", emoji: "🍲", missingIndex: 1, choices: ["o", "a", "u"] },
  { word: "nut", emoji: "🥜", missingIndex: 1, choices: ["u", "a", "i"] },
];

const picturePuzzles = {
  english: {
    title: "ABC Garden",
    instruction: "Put the picture pieces in their matching spaces.",
    pieces: [
      ["🌤️", "A", "sky"], ["☁️", "B", "cloud"], ["🦋", "C", "blue"],
      ["🌷", "D", "pink"], ["🐝", "E", "yellow"], ["🌿", "F", "green"],
      ["🍎", "G", "red"], ["🐞", "H", "orange"], ["🌼", "I", "purple"],
    ],
  },
  math: {
    title: "Number Garden",
    instruction: "Put the number picture pieces in order.",
    pieces: [
      ["🌤️", "1", "sky"], ["🌷", "2", "pink"], ["🍎", "3", "red"],
      ["🐞", "4", "orange"], ["🦋", "5", "blue"], ["🐝", "6", "yellow"],
      ["🌼", "7", "purple"], ["🍓", "8", "red"], ["🌻", "9", "yellow"],
    ],
  },
  hindi: {
    title: "हिंदी बगीचा",
    instruction: "चित्र के टुकड़ों को सही जगह पर लगाओ।",
    pieces: [
      ["🌤️", "अ", "sky"], ["🥭", "आ", "yellow"], ["🌿", "इ", "green"],
      ["🦉", "उ", "purple"], ["🧶", "ऊ", "pink"], ["🪷", "क", "pink"],
      ["🐇", "ख", "green"], ["🪴", "ग", "green"], ["🏠", "घ", "orange"],
    ],
  },
};

const foodRecipes = [
  {
    id: "pizza",
    name: "Cheesy pizza",
    emoji: "🍕",
    tone: "english",
    finishAction: "Bake it!",
    finishEmoji: "🔥",
    finishInstruction: "Your pizza is ready for the oven!",
    steps: [
      { id: "dough", name: "Pizza dough", emoji: "🫓", instruction: "Put the dough on the tray." },
      { id: "sauce", name: "Tomato sauce", emoji: "🍅", instruction: "Spread the tomato sauce." },
      { id: "cheese", name: "Cheese", emoji: "🧀", instruction: "Sprinkle on the cheese." },
      { id: "topping", name: "Toppings", emoji: "🫑", instruction: "Add a yummy topping." },
    ],
  },
  {
    id: "ice-cream",
    name: "Berry ice cream",
    emoji: "🍨",
    tone: "case-game",
    finishAction: "Serve it!",
    finishEmoji: "✨",
    finishInstruction: "Your ice cream is ready to enjoy!",
    steps: [
      { id: "scoop", name: "Ice cream", emoji: "🍦", instruction: "Add a scoop of ice cream." },
      { id: "berries", name: "Berries", emoji: "🍓", instruction: "Add some sweet berries." },
      { id: "sauce", name: "Chocolate sauce", emoji: "🍫", instruction: "Drizzle on chocolate sauce." },
      { id: "sprinkles", name: "Sprinkles", emoji: "🌈", instruction: "Shake on the sprinkles." },
    ],
  },
  {
    id: "roti",
    name: "Soft roti",
    emoji: "🫓",
    tone: "math",
    finishAction: "Cook the roti!",
    finishEmoji: "🔥",
    finishInstruction: "Put the roti on the hot tawa!",
    steps: [
      { id: "flour", name: "Flour", emoji: "🌾", instruction: "Put flour in the bowl." },
      { id: "water", name: "Water", emoji: "💧", instruction: "Pour in some water." },
      { id: "knead", name: "Dough", emoji: "🫓", instruction: "Mix and knead the dough." },
      { id: "roll", name: "Rolling pin", emoji: "🥖", instruction: "Roll the dough flat." },
    ],
  },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const cheers = ["Great job!", "You got it!", "Hooray!", "Fantastic!", "That’s right!"];
const roundsPerGame = 10;
const tracks = [
  { name: "Sunny Steps", melody: [72, 76, 79, 76, 74, 79, null, 79, 72, 76, 79, 81, 79, null, 74, 72], bass: [48, 55, 53, 55], tempo: 520 },
  { name: "Moonbeam Waltz", melody: [69, 72, 76, 72, 71, 74, 78, 74, 69, 72, 76, 79, 76, null, 72, 69], bass: [45, 52, 50, 52], tempo: 620 },
  { name: "Bouncy Bubbles", melody: [76, 79, 83, 79, 76, null, 81, 83, 84, 83, 81, null, 79, 76, 72, 76], bass: [48, 55, 60, 55], tempo: 440 },
];
const confettiColors = ["#ff8178", "#ffd46c", "#56b895", "#72b6e8", "#a994e8"];

const shuffle = (items) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
};

function makeRounds(mode) {
  if (mode === "english-spell") {
    return shuffle(spellingWords).slice(0, roundsPerGame);
  }
  if (mode === "english-order") {
    return Array.from({ length: roundsPerGame }, () => {
      const index = Math.floor(Math.random() * (alphabet.length - 2)) + 1;
      return { letter: alphabet[index], sequence: alphabet.slice(index - 1, index + 2) };
    });
  }
  if (mode === "math") {
    return shuffle(mathThings).map((item) => ({ ...item, count: Math.floor(Math.random() * 10) + 1 }));
  }
  return shuffle(mode === "hindi" ? hindiPictures : pictures).slice(0, roundsPerGame);
}

function makeChoices(mode, current) {
  const isCase = mode === "english-case";
  const answer = mode === "math"
    ? String(current.count)
    : mode === "english-spell"
      ? current.word[current.missingIndex]
      : isCase ? current.letter.toLowerCase() : current.letter;
  let distractors;
  if (mode === "math") {
    distractors = shuffle(Array.from({ length: 10 }, (_, index) => String(index + 1))
      .filter((number) => number !== answer)).slice(0, 2);
  } else if (mode === "english-spell") {
    distractors = current.choices.filter((letter) => letter !== answer);
  } else if (isCase) {
    distractors = shuffle(alphabet.map((letter) => letter.toLowerCase())
      .filter((letter) => letter !== answer)).slice(0, 2);
  } else if (mode === "english-order") {
    distractors = shuffle(alphabet.filter((letter) => letter !== answer)).slice(0, 2);
  } else {
    distractors = shuffle((mode === "hindi" ? hindiPictures : pictures)
      .filter((item) => item.letter !== answer)).slice(0, 2).map((item) => item.letter);
  }
  return { answer, options: shuffle([answer, ...distractors]) };
}

function createTone(context, midiNote, start, duration, volume, type = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(440 * (2 ** ((midiNote - 69) / 12)), start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playNotes(context, notes, { spacing = 0.13, volume = 0.045, duration = 0.32 } = {}) {
  if (!context || context.state !== "running") return;
  const start = context.currentTime + 0.02;
  notes.forEach((note, index) => {
    if (note !== null) createTone(context, note, start + index * spacing, duration, volume);
  });
}

function SubjectCard({ icon, name, description, tone, onClick }) {
  return (
    <button className={`subject-card ${tone}`} onClick={onClick} type="button">
      <span className="subject-icon" aria-hidden="true">{icon}</span>
      <span className="subject-copy">
        <span className="subject-name">{name}</span>
        <span className="subject-description">{description}</span>
      </span>
      <span className="subject-arrow" aria-hidden="true">→</span>
    </button>
  );
}

function PuzzleTile({ icon, label }) {
  return (
    <span className="puzzle-tile-content">
      <span className="puzzle-tile-icon" aria-hidden="true">{icon}</span>
      <span className="puzzle-tile-label">{label}</span>
    </span>
  );
}

function Celebration({ id }) {
  return (
    <div className="celebration" key={id} aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span
          className="confetti-piece"
          key={`${id}-${index}`}
          style={{
            "--confetti-x": `${8 + ((index * 47) % 84)}%`,
            "--confetti-delay": `${(index % 6) * 35}ms`,
            "--confetti-color": confettiColors[index % confettiColors.length],
            "--confetti-spin": `${index % 2 ? 270 : -270}deg`,
            "--confetti-drift": `${((index * 31) % 110) - 55}px`,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("english-picture");
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [wrongOptions, setWrongOptions] = useState([]);
  const [celebrationId, setCelebrationId] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicError, setMusicError] = useState("");
  const [puzzleSubject, setPuzzleSubject] = useState("english");
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [placedPuzzlePieces, setPlacedPuzzlePieces] = useState([]);
  const [selectedPuzzlePiece, setSelectedPuzzlePiece] = useState(null);
  const [puzzleFeedback, setPuzzleFeedback] = useState("");
  const [foodRecipeId, setFoodRecipeId] = useState("pizza");
  const [foodIngredientTray, setFoodIngredientTray] = useState([]);
  const [foodStep, setFoodStep] = useState(0);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [foodFeedback, setFoodFeedback] = useState("");
  const [foodFinished, setFoodFinished] = useState(false);
  const audioRef = useRef(null);
  const musicTimerRef = useRef(null);
  const musicStepRef = useRef(0);
  const nextButtonRef = useRef(null);

  const current = rounds[round];
  const choiceSet = useMemo(() => current ? makeChoices(mode, current) : null, [mode, current]);
  const isEnglish = mode.startsWith("english");
  const isEnglishCase = mode === "english-case";
  const isEnglishOrder = mode === "english-order";
  const isEnglishSpelling = mode === "english-spell";

  function playFeedback(notes, options) {
    if (!soundEnabled || audioRef.current?.state !== "running") return;
    playNotes(audioRef.current, notes, options);
  }

  useEffect(() => {
    if (!soundEnabled || !["quiz", "finish", "puzzle", "food", "cooking"].includes(screen)) return undefined;
    const context = audioRef.current;
    if (!context || context.state !== "running") return undefined;
    const track = tracks[trackIndex];
    const playStep = () => {
      const step = musicStepRef.current;
      const note = track.melody[step % track.melody.length];
      const time = context.currentTime + 0.02;
      if (note !== null) createTone(context, note, time, track.tempo / 1500, 0.018);
      if (step % 4 === 0) {
        const bass = track.bass[Math.floor(step / 4) % track.bass.length];
        createTone(context, bass, time, 0.72, 0.007);
      }
      musicStepRef.current += 1;
    };

    musicStepRef.current = 0;
    playStep();
    musicTimerRef.current = window.setInterval(playStep, track.tempo);
    return () => {
      window.clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    };
  }, [screen, soundEnabled, trackIndex]);

  useEffect(() => () => {
    window.clearInterval(musicTimerRef.current);
    if (audioRef.current && audioRef.current.state !== "closed") {
      void audioRef.current.close();
    }
  }, []);

  async function unlockMusic() {
    if (!window.AudioContext) {
      setMusicError("Music isn't supported by this browser.");
      return;
    }
    try {
      audioRef.current ??= new window.AudioContext();
      await audioRef.current.resume();
      setMusicError("");
    } catch (error) {
      setMusicError("Music couldn't start. Try turning music off and on again.");
      console.error("Unable to start game music.", error);
    }
  }

  function startGame(nextMode) {
    const nextRounds = makeRounds(nextMode);
    setMode(nextMode);
    setRounds(nextRounds);
    setRound(0);
    setScore(0);
    setAnswered(false);
    setFeedback("");
    setWrongOptions([]);
    setScreen("quiz");
    void unlockMusic();
  }

  function handleEnglishPicture() {
    setScreen("english");
  }

  function startPuzzle(subject) {
    setPuzzleSubject(subject);
    setPuzzlePieces(shuffle(Array.from({ length: picturePuzzles[subject].pieces.length }, (_, index) => index)));
    setPlacedPuzzlePieces(Array(picturePuzzles[subject].pieces.length).fill(null));
    setSelectedPuzzlePiece(null);
    setPuzzleFeedback("");
    setScreen("puzzle");
    void unlockMusic();
  }

  function selectPuzzlePiece(pieceIndex) {
    if (placedPuzzlePieces.includes(pieceIndex)) return;
    setSelectedPuzzlePiece((selected) => selected === pieceIndex ? null : pieceIndex);
    setPuzzleFeedback("");
  }

  function placePuzzlePiece(slotIndex) {
    if (selectedPuzzlePiece === null || placedPuzzlePieces[slotIndex] !== null) return;
    if (selectedPuzzlePiece !== slotIndex) {
      setPuzzleFeedback(puzzleSubject === "hindi" ? "फिर से कोशिश करो!" : "Not quite. Try another space!");
      playFeedback([67, 64], { spacing: 0.14, volume: 0.028, duration: 0.2 });
      return;
    }

    const nextPlaced = [...placedPuzzlePieces];
    nextPlaced[slotIndex] = selectedPuzzlePiece;
    setPlacedPuzzlePieces(nextPlaced);
    setSelectedPuzzlePiece(null);
    const complete = nextPlaced.every((piece) => piece !== null);
    setPuzzleFeedback(complete
      ? puzzleSubject === "hindi" ? "शाबाश! तुमने पूरा चित्र बनाया!" : `Amazing! You made the ${picturePuzzles[puzzleSubject].title}!`
      : puzzleSubject === "hindi" ? "शाबाश! एक टुकड़ा सही जगह पर!" : "Great fit! Find the next piece!");
    playFeedback(complete ? [72, 76, 79, 84, 79, 84, 88] : [72, 76, 79], {
      spacing: 0.11,
      volume: complete ? 0.055 : 0.045,
      duration: complete ? 0.42 : 0.3,
    });
    if (complete) setCelebrationId((id) => id + 1);
  }

  function returnToPuzzleMenu() {
    setScreen(puzzleSubject);
  }

  function startCooking(recipeId) {
    setFoodRecipeId(recipeId);
    const recipe = foodRecipes.find((item) => item.id === recipeId);
    setFoodIngredientTray(shuffle(recipe.steps));
    setFoodStep(0);
    setFoodIngredients([]);
    setSelectedIngredient(null);
    setDraggedIngredient(null);
    setFoodFeedback("");
    setFoodFinished(false);
    setScreen("cooking");
    void unlockMusic();
  }

  function addFoodIngredient(ingredientId) {
    if (foodFinished) return;
    const recipe = foodRecipes.find((item) => item.id === foodRecipeId);
    const requiredIngredient = recipe?.steps[foodStep];
    if (!recipe || !requiredIngredient) return;

    if (ingredientId !== requiredIngredient.id) {
      setFoodFeedback("Let’s follow the recipe. Try the ingredient in this step!");
      playFeedback([67, 64], { spacing: 0.14, volume: 0.028, duration: 0.2 });
      return;
    }

    setFoodIngredients((items) => [...items, requiredIngredient]);
    setFoodStep((step) => step + 1);
    setSelectedIngredient(null);
    setDraggedIngredient(null);
    setFoodFeedback(`Great! ${requiredIngredient.name} is in!`);
    playFeedback([72, 76, 79], { spacing: 0.11, volume: 0.045, duration: 0.3 });
  }

  function finishCooking() {
    if (foodStep < foodRecipes.find((item) => item.id === foodRecipeId).steps.length || foodFinished) return;
    setFoodFinished(true);
    setFoodFeedback(`Ta-da! You made ${foodRecipes.find((item) => item.id === foodRecipeId).name}!`);
    setCelebrationId((id) => id + 1);
    playFeedback([72, 76, 79, 84, 79, 84, 88], { spacing: 0.13, volume: 0.055, duration: 0.42 });
  }

  function goHome() {
    setScreen("home");
  }

  function answer(option) {
    if (!current || answered || wrongOptions.includes(option)) return;
    if (option !== choiceSet.answer) {
      setWrongOptions((options) => [...options, option]);
      setFeedback(mode === "math" ? "Nearly! Try counting again." : mode === "hindi" ? "फिर से कोशिश करो!" : "Nearly! Try another letter.");
      playFeedback([67, 64], { spacing: 0.14, volume: 0.028, duration: 0.2 });
      return;
    }
    setAnswered(true);
    setCelebrationId((id) => id + 1);
    setScore((value) => value + 1);
    setFeedback(mode === "math"
      ? `${cheers[Math.floor(Math.random() * cheers.length)]} There are ${current.count} ${current.word}!`
      : mode === "hindi"
        ? `शाबाश! ${current.word}, ${current.letter} से शुरू होता है!`
        : mode === "english-case"
          ? `You got it! ${current.letter} and ${current.letter.toLowerCase()} are a pair!`
          : mode === "english-spell"
            ? `Great spelling! You made the word ${current.word}!`
            : mode === "english-order"
            ? `Great job! ${current.letter} comes next!`
            : `${cheers[Math.floor(Math.random() * cheers.length)]} ${current.word} starts with ${current.letter}!`);
    playFeedback([72, 76, 79, 84], { spacing: 0.11, volume: 0.05, duration: 0.34 });
    window.setTimeout(() => nextButtonRef.current?.focus(), 0);
  }

  function advanceRound() {
    if (round + 1 >= roundsPerGame) {
      setScreen("finish");
      playFeedback([72, 76, 79, 84, 79, 84, 88], { spacing: 0.16, volume: 0.055, duration: 0.42 });
      return;
    }
    setRound((value) => value + 1);
    setAnswered(false);
    setWrongOptions([]);
    setFeedback("");
  }

  async function toggleMusic() {
    if (soundEnabled) {
      setSoundEnabled(false);
      if (audioRef.current?.state === "running") await audioRef.current.suspend();
      return;
    }
    setSoundEnabled(true);
    await unlockMusic();
  }

  const screenBack = () => {
    if (isEnglish) setScreen("english");
    else if (mode === "math" || mode === "hindi") setScreen(mode);
    else goHome();
  };

  const puzzle = picturePuzzles[puzzleSubject];
  const puzzleComplete = placedPuzzlePieces.length > 0 && placedPuzzlePieces.every((piece) => piece !== null);
  const foodRecipe = foodRecipes.find((item) => item.id === foodRecipeId) ?? foodRecipes[0];
  const cookingDoneWithIngredients = foodStep >= foodRecipe.steps.length;

  let promptContent;
  let pictureName = current?.word;
  let pictureLabel = current?.word ?? "";
  let question = "";
  if (current && mode === "math") {
    promptContent = Array.from({ length: current.count }, (_, index) => (
      <span aria-hidden="true" key={`${current.emoji}-${index}`}>{current.emoji}</span>
    ));
    pictureName = "Count them!";
    pictureLabel = `${current.count} ${current.word}`;
    question = `How many ${current.word} do you see?`;
  } else if (current && mode === "hindi") {
    promptContent = current.emoji;
    question = "यह किस अक्षर से शुरू होता है?";
  } else if (current && isEnglishSpelling) {
    promptContent = current.emoji;
    pictureName = current.word.split("").map((letter, index) => (
      index === current.missingIndex
        ? <span className="spelling-gap" key={index}>_</span>
        : <span key={index}>{letter}</span>
    ));
    pictureLabel = `${current.word.slice(0, current.missingIndex)} missing letter ${current.word.slice(current.missingIndex + 1)}`;
    question = "Which letter completes the word?";
  } else if (current && isEnglishCase) {
    promptContent = current.letter;
    pictureName = "Big letter";
    pictureLabel = `Big letter ${current.letter}`;
    question = `Find the little letter for ${current.letter}!`;
  } else if (current && isEnglishOrder) {
    promptContent = current.sequence.map((letter, index) => (
      <span className={index === 1 ? "letter-gap" : ""} aria-hidden={index === 1 || undefined} key={letter}>
        {index === 1 ? "?" : letter}
      </span>
    ));
    pictureLabel = `${current.sequence[0]}, missing letter, ${current.sequence[2]}`;
    pictureName = "Fill the gap!";
    question = "Which letter is missing?";
  } else if (current) {
    promptContent = current.emoji;
    question = "Which letter does it start with?";
  }

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); goHome(); }}>
          <span className="brand-mark" aria-hidden="true">🌱</span>
          <span>Little Learners</span>
        </a>
        <div className="audio-controls" aria-label="Music controls">
          <button
            className="track-button"
            type="button"
            aria-label={`Change music tune. Current tune: ${tracks[trackIndex].name}`}
            onClick={() => setTrackIndex((index) => (index + 1) % tracks.length)}
          >
            <span aria-hidden="true">🎼</span>
            <span>{tracks[trackIndex].name}</span>
            <span aria-hidden="true">↻</span>
          </button>
          <button className="sound-button" type="button" aria-pressed={soundEnabled} onClick={toggleMusic}>
            <span aria-hidden="true">{soundEnabled ? "🎵" : "🔇"}</span>
            <span>{soundEnabled ? "Music on" : "Music off"}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="game" aria-live="polite">
          {screen === "home" && (
            <div className="landing">
              <div className="landing-hero">
                <p className="eyebrow">Little games, big discoveries</p>
                <h1>What shall we<br />learn today?</h1>
                <p className="subtitle">Pick a subject and let’s play together!</p>
              </div>
              <div className="subject-grid home-subjects" aria-label="Choose a subject">
                <SubjectCard icon="🔤" name="English" description="Fun games with letters" tone="english" onClick={handleEnglishPicture} />
                <SubjectCard icon="🔢" name="Math" description="Count the fun things" tone="math" onClick={() => setScreen("math")} />
                <SubjectCard icon="अ" name="Hindi" description="चित्रों से अक्षर पहचानें" tone="hindi" onClick={() => setScreen("hindi")} />
                <SubjectCard icon="👩‍🍳" name="Let’s cook!" description="Make a yummy treat step by step" tone="spelling-game" onClick={() => setScreen("food")} />
              </div>
              <p className="more-subjects">More fun is on the way!</p>
              <div className="coming-soon" aria-label="More subjects coming soon">
                <span>🎨 Colors</span><span>🔺 Shapes</span><span>🌍 Nature</span>
              </div>
            </div>
          )}

          {screen === "english" && (
            <div className="landing">
              <button className="back-button" type="button" onClick={goHome}>← Choose a subject</button>
              <div className="landing-hero">
                <p className="eyebrow">English games</p>
                <h1>Let’s play<br />with letters!</h1>
                <p className="subtitle">Choose a fun way to learn your ABCs.</p>
              </div>
              <div className="subject-grid english-games" aria-label="Choose an English game">
                <SubjectCard icon="🍎" name="Picture letters" description="Find the first letter" tone="english" onClick={() => startGame("english-picture")} />
                <SubjectCard icon="Aa" name="Big & little" description="Match A with a" tone="case-game" onClick={() => startGame("english-case")} />
                <SubjectCard icon="🔠" name="ABC order" description="Fill the missing letter" tone="order-game" onClick={() => startGame("english-order")} />
                <SubjectCard icon="🧩" name="Missing letter" description="Spell a little word" tone="spelling-game" onClick={() => startGame("english-spell")} />
                <SubjectCard icon="🧩" name="ABC puzzle" description="Put the picture pieces together" tone="spelling-game" onClick={() => startPuzzle("english")} />
              </div>
            </div>
          )}

          {(screen === "math" || screen === "hindi") && (
            <div className="landing">
              <button className="back-button" type="button" onClick={goHome}>← Choose a subject</button>
              <div className="landing-hero">
                <p className="eyebrow">{screen === "math" ? "Math games" : "हिंदी के खेल"}</p>
                <h1>{screen === "math" ? <>Let’s count<br />and play!</> : <>आओ खेलें<br />और सीखें!</>}</h1>
                <p className="subtitle">{screen === "math" ? "Choose a fun way to learn numbers." : "अपना पसंदीदा खेल चुनो।"}</p>
              </div>
              <div className="subject-grid english-games" aria-label={screen === "math" ? "Choose a math game" : "हिंदी का खेल चुनें"}>
                {screen === "math" ? (
                  <>
                    <SubjectCard icon="🔢" name="Count the fun" description="Count and choose a number" tone="math" onClick={() => startGame("math")} />
                    <SubjectCard icon="🧩" name="Number puzzle" description="Put the picture pieces in order" tone="spelling-game" onClick={() => startPuzzle("math")} />
                  </>
                ) : (
                  <>
                    <SubjectCard icon="अ" name="चित्र अक्षर" description="चित्र का पहला अक्षर चुनो" tone="hindi" onClick={() => startGame("hindi")} />
                    <SubjectCard icon="🧩" name="चित्र पहेली" description="चित्र के टुकड़े जोड़ो" tone="spelling-game" onClick={() => startPuzzle("hindi")} />
                  </>
                )}
              </div>
            </div>
          )}

          {screen === "food" && (
            <div className="landing">
              <button className="back-button" type="button" onClick={goHome}>← Choose a subject</button>
              <div className="landing-hero">
                <p className="eyebrow">Little chef kitchen</p>
                <h1>What shall we<br />make today?</h1>
                <p className="subtitle">Pick a recipe, then follow the steps!</p>
              </div>
              <div className="subject-grid english-games" aria-label="Choose a recipe">
                {foodRecipes.map((recipe) => (
                  <SubjectCard
                    icon={recipe.emoji}
                    name={recipe.name}
                    description="Drag and drop the ingredients"
                    tone={recipe.tone}
                    onClick={() => startCooking(recipe.id)}
                    key={recipe.id}
                  />
                ))}
              </div>
            </div>
          )}

          {screen === "cooking" && (
            <div className="cooking-screen quiz-screen-enter">
              <button className="back-button" type="button" onClick={() => setScreen("food")}>← Choose another recipe</button>
              <div className="landing-hero cooking-heading">
                <p className="eyebrow">Little chef kitchen</p>
                <h1>{foodRecipe.name}</h1>
                <p className="subtitle">
                  {foodFinished
                    ? "You made it! What a brilliant little chef!"
                    : cookingDoneWithIngredients
                      ? foodRecipe.finishInstruction
                      : `Step ${foodStep + 1} of ${foodRecipe.steps.length}: ${foodRecipe.steps[foodStep].instruction}`}
                </p>
              </div>
              <div className="cooking-progress" aria-label={`${foodStep} of ${foodRecipe.steps.length} ingredients added`}>
                {foodRecipe.steps.map((step, index) => (
                  <span className={`cooking-step-dot${index < foodStep ? " complete" : ""}${index === foodStep && !foodFinished ? " current" : ""}`} key={step.id}>
                    {index < foodStep ? "✓" : index + 1}
                  </span>
                ))}
              </div>
              <div className="kitchen-layout">
                <div className="prep-area">
                  <p className="kitchen-label">{foodFinished ? "Ready to eat!" : "Your cooking spot"}</p>
                  <button
                    className={`food-plate${foodFinished ? " finished" : ""}${draggedIngredient ? " ready-for-drop" : ""}`}
                    type="button"
                    aria-label={foodFinished
                      ? `${foodRecipe.name} is ready`
                      : selectedIngredient
                        ? `Add selected ingredient to ${foodRecipe.name}`
                        : `Drop ingredients here to make ${foodRecipe.name}`}
                    onClick={() => selectedIngredient && addFoodIngredient(selectedIngredient)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const ingredientId = event.dataTransfer.getData("text/plain") || draggedIngredient;
                      if (ingredientId) addFoodIngredient(ingredientId);
                    }}
                  >
                    <span className="plate-dish" aria-hidden="true">{foodRecipe.emoji}</span>
                    <span className="plate-ingredients" aria-label={`${foodIngredients.length} ingredients added`}>
                      {foodIngredients.map((ingredient) => (
                        <span className="ingredient-on-plate" key={ingredient.id} aria-label={ingredient.name}>
                          {ingredient.emoji}
                        </span>
                      ))}
                    </span>
                    {!foodIngredients.length && !foodFinished && <span className="plate-hint" aria-hidden="true">Drop here!</span>}
                    {foodFinished && <span className="finish-sparkle" aria-hidden="true">{foodRecipe.finishEmoji}</span>}
                  </button>
                  <p className={`cooking-feedback${foodFeedback.startsWith("Great") || foodFinished ? " positive" : ""}`} aria-live="assertive">
                    {foodFeedback || (selectedIngredient ? "Now tap the cooking spot!" : "Choose an ingredient to get started.")}
                  </p>
                  {cookingDoneWithIngredients && !foodFinished && (
                    <button className="primary-button cook-button" type="button" onClick={finishCooking}>
                      {foodRecipe.finishEmoji} {foodRecipe.finishAction}
                    </button>
                  )}
                  {foodFinished && (
                    <button className="primary-button cook-button" type="button" onClick={() => startCooking(foodRecipe.id)}>
                      Make it again ↻
                    </button>
                  )}
                  {foodFinished && <Celebration id={celebrationId} />}
                </div>
                <div className="ingredient-area">
                  <h2 className="kitchen-label">Ingredients <span>Drag one, or tap it!</span></h2>
                  <div className="ingredient-tray">
                    {foodIngredientTray.map((ingredient) => {
                      const added = foodIngredients.some((item) => item.id === ingredient.id);
                      return (
                        <button
                          className={`ingredient-card${added ? " added" : ""}${selectedIngredient === ingredient.id ? " selected" : ""}`}
                          type="button"
                          draggable={!added && !foodFinished}
                          aria-label={`${ingredient.name}${added ? ", added" : selectedIngredient === ingredient.id ? ", selected" : ""}`}
                          aria-pressed={selectedIngredient === ingredient.id}
                          disabled={added || foodFinished}
                          onClick={() => {
                            setSelectedIngredient((selected) => selected === ingredient.id ? null : ingredient.id);
                            setFoodFeedback("");
                          }}
                          onDragStart={(event) => {
                            event.dataTransfer.setData("text/plain", ingredient.id);
                            event.dataTransfer.effectAllowed = "move";
                            setDraggedIngredient(ingredient.id);
                          }}
                          onDragEnd={() => setDraggedIngredient(null)}
                          key={ingredient.id}
                        >
                          <span className="ingredient-emoji" aria-hidden="true">{ingredient.emoji}</span>
                          <span className="ingredient-name">{ingredient.name}</span>
                          {added && <span className="ingredient-check" aria-hidden="true">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {screen === "puzzle" && (
            <div className="puzzle-screen quiz-screen-enter" lang={puzzleSubject === "hindi" ? "hi" : undefined}>
              <button className="back-button" type="button" onClick={returnToPuzzleMenu}>← Choose another game</button>
              <div className="landing-hero puzzle-heading">
                <p className="eyebrow">{puzzleSubject === "hindi" ? "हिंदी पहेली" : `${puzzleSubject} picture puzzle`}</p>
                <h1>{puzzle.title}</h1>
                <p className="subtitle" lang={puzzleSubject === "hindi" ? "hi" : undefined}>{puzzle.instruction}</p>
              </div>
              <p className="puzzle-progress" aria-live="polite">
                {puzzleSubject === "hindi"
                  ? `${puzzle.pieces.length} में से ${placedPuzzlePieces.filter((piece) => piece !== null).length} टुकड़े लगाए`
                  : `${placedPuzzlePieces.filter((piece) => piece !== null).length} of ${puzzle.pieces.length} pieces placed`}
              </p>
              <div className="puzzle-layout">
                <div>
                  <h2 className="puzzle-label">{puzzleSubject === "hindi" ? "चित्र" : "Picture"}</h2>
                  <div className="puzzle-grid" role="group" aria-label="Picture puzzle spaces">
                    {placedPuzzlePieces.map((pieceIndex, slotIndex) => {
                      const [icon, label, color] = puzzle.pieces[slotIndex];
                      const filled = pieceIndex !== null;
                      return (
                        <button
                          className={`puzzle-slot${filled ? " filled" : ""}${selectedPuzzlePiece !== null && !filled ? " drop-target" : ""}`}
                          style={{ "--piece-color": `var(--puzzle-${color})` }}
                          type="button"
                          aria-label={puzzleSubject === "hindi"
                            ? filled ? `${label}, लगाया गया` : `${label} की जगह${selectedPuzzlePiece !== null ? ", चुना हुआ टुकड़ा यहाँ लगाएँ" : ""}`
                            : filled ? `${label}, placed` : `${label} space${selectedPuzzlePiece !== null ? ", place selected piece here" : ""}`}
                          disabled={filled}
                          onClick={() => placePuzzlePiece(slotIndex)}
                          key={slotIndex}
                        >
                          {filled ? (
                            <PuzzleTile icon={icon} label={label} />
                          ) : (
                            <span className="puzzle-hint" aria-hidden="true">{icon}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h2 className="puzzle-label">
                    {puzzleSubject === "hindi" ? "टुकड़े" : "Pieces"}
                    <span>{puzzleSubject === "hindi" ? "— पहले टुकड़ा, फिर उसकी जगह छुएँ" : "— tap a piece, then its space"}</span>
                  </h2>
                  <div className="puzzle-grid puzzle-tray" role="group" aria-label="Puzzle pieces">
                    {puzzlePieces.map((pieceIndex) => {
                      const [icon, label, color] = puzzle.pieces[pieceIndex];
                      const placed = placedPuzzlePieces.includes(pieceIndex);
                      return (
                        <button
                          className={`puzzle-piece${placed ? " placed" : ""}${selectedPuzzlePiece === pieceIndex ? " selected" : ""}`}
                          style={{ "--piece-color": `var(--puzzle-${color})` }}
                          type="button"
                          aria-label={puzzleSubject === "hindi"
                            ? `टुकड़ा ${label}${placed ? ", पहले से लगा है" : selectedPuzzlePiece === pieceIndex ? ", चुना हुआ" : ""}`
                            : `Piece ${label}${placed ? ", already placed" : selectedPuzzlePiece === pieceIndex ? ", selected" : ""}`}
                          aria-pressed={selectedPuzzlePiece === pieceIndex}
                          disabled={placed}
                          onClick={() => selectPuzzlePiece(pieceIndex)}
                          key={pieceIndex}
                        >
                          <PuzzleTile icon={icon} label={label} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className={`puzzle-feedback${puzzleComplete ? " puzzle-complete" : ""}`} aria-live="assertive">
                {puzzleFeedback}
              </p>
              {musicError && <p className="music-note" role="status">{musicError}</p>}
              {puzzleComplete && (
                <>
                  <button className="primary-button next-button" type="button" onClick={() => startPuzzle(puzzleSubject)}>
                    {puzzleSubject === "hindi" ? "फिर से खेलें ↻" : "Make another picture ↻"}
                  </button>
                  <Celebration id={celebrationId} />
                </>
              )}
            </div>
          )}

          {screen === "quiz" && current && choiceSet && (
            <div className="quiz-screen-enter" key={`quiz-${mode}`}>
              <button className="back-button" type="button" onClick={screenBack}>← Choose another game</button>
              <div className="round-header">
                <span className="round-label">{round + 1} of {roundsPerGame}</span>
                <div className="progress" aria-label={`Question ${round + 1} of ${roundsPerGame}`}>
                  {Array.from({ length: roundsPerGame }, (_, index) => (
                    <span className={`progress-dot${index < round ? " done" : ""}${index === round ? " current" : ""}`} key={index} />
                  ))}
                </div>
                <span className="score" aria-label="Stars earned">⭐ {score}</span>
              </div>
              <div className="prompt prompt-pop" key={`prompt-${round}`}>
                <div className={`picture${mode === "math" ? " counting" : ""}${isEnglishOrder ? " letter-sequence" : ""}`} role="img" aria-label={pictureLabel} lang={mode === "hindi" ? "hi" : undefined}>
                  {promptContent}
                </div>
                <p className={`picture-name${isEnglishSpelling ? " spelling-word" : ""}`} lang={mode === "hindi" ? "hi" : undefined}>{pictureName}</p>
              </div>
              <p className="question" lang={mode === "hindi" ? "hi" : undefined}>{question}</p>
              {musicError && <p className="music-note" role="status">{musicError}</p>}
              <div className="choices" role="group" aria-label="Answer choices">
                {choiceSet.options.map((option) => {
                  const correct = answered && option === choiceSet.answer;
                  const wrong = wrongOptions.includes(option);
                  return (
                    <button
                      className={`choice${correct ? " correct" : ""}${wrong ? " incorrect" : ""}`}
                      type="button"
                      aria-label={mode === "math" ? `Number ${option}` : mode === "hindi" ? `अक्षर ${option}` : `Letter ${option}`}
                      disabled={answered || wrong}
                      onClick={() => answer(option)}
                      key={option}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className={`feedback${feedback && wrongOptions.length ? " try-again" : ""}`} aria-live="assertive">{feedback}</p>
              {answered && (
                <button className="primary-button next-button" type="button" onClick={advanceRound} ref={nextButtonRef}>
                  {round === roundsPerGame - 1 ? "See my stars ★" : isEnglishSpelling ? "Next word →" : "Next picture →"}
                </button>
              )}
              {answered && <Celebration id={celebrationId} />}
            </div>
          )}

          {screen === "finish" && (
            <div className="finish-screen-enter">
              <p className="eyebrow">You did it!</p>
              <h1>Super star!</h1>
              <div className="finish-stars" aria-hidden="true">🌟🌱🌟</div>
              <p className="subtitle">
                {mode === "math" ? "You counted all the fun things. Great job, little learner!"
                  : mode === "hindi" ? "तुमने सारे अक्षर पहचान लिए! शाबाश!"
                    : mode === "english-spell" ? "You spelled lots of little words. Great job, little learner!"
                      : "You found letters for all the pictures. Great job, little learner!"}
              </p>
              <Celebration id={celebrationId} />
              <p className="finish-score">You earned {score} {score === 1 ? "star" : "stars"}!</p>
              <button className="primary-button" type="button" onClick={() => startGame(mode)}>Play again ↻</button>
              <button className="back-button" type="button" onClick={screenBack}>← Choose another game</button>
            </div>
          )}
        </section>
      </main>
      <p className="footer-note">Made for curious little learners ✨</p>
    </div>
  );
}

export default App;
