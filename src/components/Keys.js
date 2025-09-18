import { useRef } from "react";

const Keys = ({ chars, audio, id, setText }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.muted = false;
      currentAudioRef.currentTime = 0;
      currentAudioRef.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Audio play failed:", error);
        }
      });
    }
    setText(id.split("-").join(" "));
  };

  return (
    <div
      onClick={handlePlay}
      className="drum-pad"
      id={id}
      tabIndex={0} 
    >
      <button>{chars}</button>
      <audio ref={audioRef} className="clip" id={chars} src={audio} muted />
    </div>
  );
};

export default Keys;