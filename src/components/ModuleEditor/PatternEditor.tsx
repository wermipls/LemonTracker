import React, {useEffect, useRef, useState} from "react";
import Pattern from "../../models/pattern";
import EditorRow from "./EditorRow";

type PatternEditorProps = {
  currentPattern: Pattern;
};

function PatternEditor({ currentPattern }: PatternEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentYPosition, setCurrentYPosition] = useState(0);
  const [currentXPosition, setCurrentXPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setCurrentYPosition((prev) => {
            if(prev === 0) {
              return prev;
            }
            return prev - 1;
          });
          break;
        case "ArrowDown":
          setCurrentYPosition((prev) => {
            if(prev === currentPattern.patternRows.length - 1) {
              return prev;
            }
            return prev + 1
          });
          break;
        case "ArrowLeft":
          setCurrentXPosition((prev) => {
            if(prev === 0) {
              return prev;
            }
            return prev - 1
          });
          break;
        case "ArrowRight":
          setCurrentXPosition((prev) => {
            if(prev === 4) {
              return prev;
            }
            return prev + 1
          });
          break;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        setCurrentYPosition((prev) => {
          if (prev === 0) {
            return prev;
          }
          return prev - 1;
        });
      } else {
        setCurrentYPosition((prev) => {
          if (prev === currentPattern.patternRows.length - 1) {
            return prev;
          }
          return prev + 1;
        });
      }
    };

    setCurrentYPosition(0);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [currentPattern]);

  return (
    <div
      ref={ref}
      className="overflow-y-hidden h-screen select-none mx-auto my-4 bg-slate-800 drop-shadow-md font-mono text-slate-400 text-lg text-center"
    >
      {currentPattern.patternRows.map((row, i) => (
        <EditorRow
          bgEndOfBar={"bg-slate-700"}
          row={row}
          index={i}
          channels={currentPattern.channels}
          key={i}
          currentYPosition={currentYPosition}
          currentXPosition={currentXPosition}
        />
      ))}
    </div>
  );
}

export default PatternEditor;
