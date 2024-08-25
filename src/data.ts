
// easy scales
// medium scales
// hard scales

// adding chords
// adding 7th chords

export const musicNotes = ["A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab"];
export const musicNotesHard = ["A", "A#", "Bb", "B", "B#", "Cb", "C", "C#", "Db", "D", "D#", "Eb", "E", "E#", "Fb", "F", "F#", "Gb", "G", "G#", "Ab"];

interface Scale {
  name: string;
  steps: string[];

}

export function getRandomElement<T>(array: T[]): T   {
  const index = Math.floor(Math.random() * array.length);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return array[index];
}

export function getRandomScale(difficulty: string): { note: string; scale: Scale } {
  let scales: Scale[];
  switch (difficulty) {
    case "hard":
      scales = hard;
      break;
    case "medium":
      scales = medium;
      break;
    case "easy":
    default:
      scales = easy;
  }

  const notes = difficulty === "hard" ? musicNotesHard : musicNotes;
  const randomNote = getRandomElement(notes);
  const randomScale = getRandomElement(scales);

  return {
    note: randomNote,
    scale: randomScale,
  };
}

export const easy: Scale[] = [
  {
    name: "chromatic",
    steps: ["h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h", "h"]
  },
  {
    name: "major/ionian",
    steps: ["W", "W", "h", "W", "W", "W", "h"]
  },
  {
    name: "minor",
    steps: ["W", "h", "W", "W", "h", "W", "W"]
  },
  {
    name: "dorian",
    steps: ["W", "h", "W", "W", "W", "h", "W"]
  },
  {
    name: "phrygian",
    steps: ["h", "W", "W", "W", "h", "W", "W"]
  },
  {
    name: "lydian",
    steps: ["W", "W", "W", "h", "W", "W", "h"]
  },
  {
    name: "mixolydian",
    steps: ["W", "W", "h", "W", "W", "h", "W"]
  },
  {
    name: "locrian",
    steps: ["h", "W", "W", "h", "W", "W", "W"]
  },
  {
    name: "harmonic minor",
    steps: ["W", "h", "W", "W", "h", "W+h", "h"]
  },
  {
    name: "blues minor",
    steps: ["W+h", "W", "h", "h", "W+h", "W"]
  },
  {
    name: "pentatonic major",
    steps: ["W", "W", "W+h", "W", "W+h"]
  },
  {
    name: "melodic minor",
    steps: ["W", "h", "W", "W", "W", "W", "h"]
  }
];

export const medium: Scale[] = [
  ...easy,
  {
    name: "blues major",
    steps: ["W+h", "W", "h", "W+h", "W"]
  },
  {
    name: "pentatonic minor",
    steps: ["W+h", "W", "W", "W+h", "W"]
  },
  {
    name: "japanese",
    steps: ["h", "W+h", "W", "h", "W+h"]
  },
  {
    name: "gypsy",
    steps: ["h", "W+h", "h", "W", "h", "W+h", "h"]
  },
  {
    name: "arabic",
    steps: ["W+h", "h", "W", "h", "W+h", "h", "W+h"]
  },
  {
    name: "freygish",
    steps: ["h", "W+h", "h", "W", "h", "W+h", "h"]
  },
  {
    name: "whole tone",
    steps: ["W", "W", "W", "W", "W", "W"]
  },
  {
    name: "bebop",
    steps: ["W", "W+h", "h", "h", "W", "h", "W", "W"]
  }
];

export const hard: Scale[] = [
  ...easy,
  ...medium,
  {
    name: "harmonic major",
    steps: ["W", "W", "h", "W", "h", "W+h", "h"]
  },
  {
    name: "Diminished H-W",
    steps: ["h", "W", "h", "W", "h", "W", "h", "W"]
  },
  {
    name: "Diminished W-H",
    steps: ["W", "h", "W", "h", "W", "h", "W", "h"]
  },
  {
    name: "Double Harmonic",
    steps: ["h", "W+h", "h", "W", "h", "W+h", "h"]
  },
  {
    name: "Prometheus",
    steps: ["W", "W", "W", "h", "W+h", "h"]
  }
];