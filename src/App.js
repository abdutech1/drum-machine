import { useEffect, useState } from "react";
import Keys from "./components/Keys";
import { keysAndSounds } from "./data";

const App = () => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const handleKeyEvent = (e) => {
      const key = e.key.toUpperCase();
      const audEl = document.getElementById(key);

      if (audEl) {
        audEl.muted = false;
        audEl.currentTime = 0;
        audEl.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error playing audio:", error);
          }
        });

        const parentDrumPad = audEl.closest(".drum-pad");
        if (parentDrumPad) {
          const displayText = parentDrumPad.id.split("-").join(" ") || "Unknown";
          setDisplayText(displayText);
          parentDrumPad.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, [setDisplayText]);

  return (
    <div
      id="drum-machine"
      className="bg-light mx-auto d-sm-flex justify-content-around align-items-center gap-5 px-4 py-3"
    >
      <div id="display-2" >
        {keysAndSounds.map((item) => (
          <Keys
            key={item.key}
            chars={item.key}
            audio={item.audio}
            id={item.id}
            setText={setDisplayText}
          />
        ))}
      </div>
      <div id="display" className="w-75 right-side d-flex justify-content-center align-items-center">
        <h3>{displayText ? displayText : 'HOW ARE YOU'}</h3>
        
      </div>
    </div>
  );
};

export default App;
