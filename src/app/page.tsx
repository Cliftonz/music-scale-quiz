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
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Head from "next/head";

export default function HomePage() {

  useHotkeys([
    ['Enter', () => nextScale() ],
    ["Spacebar", () => nextScale() ],
    [" ", () => nextScale() ],
  ]);

  const [difficulty, setDifficulty] = useLocalStorage<string>({
    key: 'scale-difficulty',
    defaultValue: 'easy',
  });
  const [hint, setHint] = useLocalStorage<boolean>({
    key: 'scale-chords',
    defaultValue: false,
  });

  const [chord, setChord] = useState("none");
  const [scale, setScale] = useState(getRandomScale(difficulty));


  function nextScale(){
    setScale(getRandomScale(difficulty))
  }

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <>
      <Head>
        <title>Music Scale Quiz Site</title>
        <meta
          name="description"
          content="This is a simple app to quiz you on your scales."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className={"pb-4 text-2xl font-bold leading-tight md:text-6xl"}>
          Scale Quiz
        </h1>
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
                  <DropdownMenuRadioItem value="easy">
                    Easy
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="medium">
                    Medium
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hard">
                    Hard
                  </DropdownMenuRadioItem>
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
                <DropdownMenuRadioGroup value={chord} onValueChange={setChord}>
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
            <h1
              className={
                "item-center flex flex-col justify-center pb-10 text-2xl font-bold leading-tight md:text-6xl"
              }
            >
              <>
                {scale.note} {capitalizeFirstLetter(scale.scale.name)}
              </>
              <>{chord === "none" ? <></> : <p> with diatonic {chord}</p>}</>
            </h1>
          </div>
        </div>
        <div className={"flex flex-row space-x-4 pb-12 pt-8"}>
          <Button
            onClick={() => {
              setHint(!hint);
            }}
          >
            Hint
          </Button>
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
        {hint ? (
          <>
            <p className={"text-bold pb-8 text-2xl"}>Hint 1</p>
            <p className={"pb-16 text-4xl md:pb-0"}>
              {scale.scale.steps.toString()}
            </p>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
