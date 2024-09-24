tracks = [
  {
    id: 0,
    title: "Afterglow",
    artist: "Wilkinson, Becky Hill",
    purchasedMp3: true,
  },
];

const createTrack = ({
  title,
  artist,
  mood = "",
  keyCamelot = "",
  keyTraditional = "",
  bpm = "",
  purchasedMp3 = false,
  purchasedLossless = false,
}) => {
  const purchased =
    purchasedMp3 === true || purchasedLossless === true ? true : false;

  return {
    title,
    artist,
    mood,
    keyCamelot,
    keyTraditional,
    bpm,
    purchasedMp3,
    purchasedLossless,
    purchased,
  };
};

const track1 = createTrack({
  title: "Hello",
  artist: "Adele",
  purchasedMp3: false,
  purchasedLossless: false,
});
tracks.push(track1);
const track2 = createTrack({
  title: "Disconnected",
  artist: "Chase and Status",
  purchasedMp3: true,
});
tracks.push(track2);

module.exports = tracks;
