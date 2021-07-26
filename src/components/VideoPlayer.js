import { useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";

const AUDIO_URL =
  "https://cdna.englishcentral.com/dialogs/26313/videoh264_26313_20160425161528.mp4";

function VideoPlayer() {
  const [isPlay, setPlay] = useState(false);
  let player = {};
  const [selectedSubId, setSelectedSubId] = useState(0);

  const subs = [
    {
      id: 1,
      start: 1,
      end: 5,
      content: "What your name ?",
    },
    {
      id: 2,
      start: 6,
      end: 10,
      content: "What your name 1 ?",
    },

    {
      id: 3,
      start: 11,
      end: 15,
      content: "What your name 2?",
    },
  ];

  const handleSeekChange = (value) => {
    console.log("value: ", value);
  };

  const setRef = (rs) => {
    player = rs;
  };

  const handleTimeChange = (ele) => {
    player.seekTo(ele);
  };

  const handleProgress = (state1) => {
    const { playedSeconds } = state1;
    console.log("second: ", playedSeconds);

    const subSelected = subs.find((sub) => {
      const { start, end } = sub;

      return playedSeconds >= start && playedSeconds <= end;
    });

    if (subSelected) {
      setSelectedSubId(subSelected.id);
    }
  };

  return (
    <div className="VideoPlayer">
      <ReactPlayer
        ref={setRef}
        url={AUDIO_URL}
        playing={isPlay}
        controls={true}
        onSeek={handleSeekChange}
        onProgress={handleProgress}
      />
      {subs.map((ele, index) => (
        <p
          className={ele.id === selectedSubId ? "style" : ""}
          onClick={(e) => handleTimeChange(ele)}
        >{`${ele.content}`}</p>
      ))}
      <button onClick={() => setPlay(true)}>play</button> ||{" "}
      <button onClick={() => setPlay(false)}>pause</button>
    </div>
  );
}

export default VideoPlayer;
