"use client"
import { useState } from "react";
import { getRandomScale } from "~/data";
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useHotkeys } from '@mantine/hooks';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function HomePage() {

  useHotkeys([
    ['Enter', () => nextScale() ],
    ["Spacebar", () => nextScale() ],
    [" ", () => nextScale() ],
  ]);

  const [difficulty, setDifficulty] = useState('easy');
  const [chord, setChord] = useState("none");
  const [scale, setScale] = useState(getRandomScale(difficulty));
  const [hint, setHint] = useState<boolean>(false);

  function nextScale(){
    setScale(getRandomScale(difficulty))
  }

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className={"pb-4 text-6xl font-bold leading-tight"}>Scale Quiz</h1>
      <div className={"flex flex-row space-x-4 pb-16 pt-8"}>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className={"text-black"} variant="outline">
                {difficulty}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Scale Quiz Difficulty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={difficulty}
                onValueChange={setDifficulty}
              >
                <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">
                  Medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className={"text-black"} variant="outline">
                {chord}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Adding Chord Requirements</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={chord}
                onValueChange={setChord}
              >
                <DropdownMenuRadioItem value="none">
                  No Chords
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="chords">
                  Chords
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="7th chords">
                  7th Chords
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <div>
          <h1 className={"pb-10 text-6xl font-bold leading-tight"}>
            {scale.note} {capitalizeFirstLetter(scale.scale.name)}
            {chord === "none" ? <></>:
              <> with diatonic {chord}</>
            }
          </h1>
        </div>
      </div>
      <div className={"flex flex-row space-x-4 pb-12 pt-8"}>
        <Button
          onClick={()=>{
            setHint(!hint)
          }}
        >Hint</Button>
        <TooltipProvider>
          <Tooltip delayDuration={250}>
            <TooltipTrigger>
              <Button onClick={nextScale} className={"text-white"}>
                Next{" "}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Alternatively hit &quot;Spacebar&quot; or &quot;Enter&quot;
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {
        hint ?
          <>
          <p className={"text-2xl text-bold"}>Hint 1</p>
            <p className={"text-4xl"}>
              {scale.scale.steps.toString()}
            </p>
          </> : <></>
      }
    </main>
  );
}
