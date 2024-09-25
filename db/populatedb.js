#! /usr/bin/env node
const { argv } = require("node:process");

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL,
    artist VARCHAR ( 255 ) NOT NULL,
    bpm DECIMAL(3,0),
    purchased_mp3 BOOLEAN NOT NULL DEFAULT FALSE,
    purchased_lossless BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    mood VARCHAR ( 255 ) NOT NULL
);

INSERT INTO moods (mood)
VALUES
('indignant/defiant'),
('joful/cheerful'),
('sad/depressing'),
('amusing'),
('annoying'),
('scary/fearful'),
('anxious/tense'),
('beautiful'),
('calm/relaxing/serene'),
('dreamy'),
('energizing/pump-up'),
('erotic/desirous'),
('triumphant/heroic');
    
CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key VARCHAR ( 4 ) NOT NULL,
    key_camelot VARCHAR ( 4 ) NOT NULL
);

INSERT INTO keys (key, key_camelot)
VALUES
('Abm','1A'),
('B', '1B'),
('Ebm', '2A'),
('F#', '2B'),
('Bbm', '3A'),
('Db', '3B'),
('Fm', '4A'),
('Ab', '4B'),
('Cm', '5A'),
('Eb', '5B'),
('Gm', '6A'),
('Bb', '6B'),
('Dm', '7A'),
('F', '7B'),
('Am', '8A'),
('C', '8B'),
('Em', '9A'),
('G', '9B'),
('Bm', '10A'),
('D', '10B'),
('F#m', '11A'),
('A', '11B'),
('Dbm', '12A'),
('E', '12B');

CREATE TABLE IF NOT EXISTS double_drops (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    main_track_id INTEGER REFERENCES tracks (id),
    accent_track_id INTEGER REFERENCES tracks (id)
);  

CREATE TABLE IF NOT EXISTS matching_tracks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_track_id INTEGER REFERENCES tracks (id),
    second_track_id INTEGER REFERENCES tracks (id)
);

CREATE TABLE IF NOT EXISTS track_mood (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    track_id INTEGER REFERENCES tracks (id),
    mood_id INTEGER REFERENCES moods (id)
);

CREATE TABLE IF NOT EXISTS track_key (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    track_id INTEGER REFERENCES tracks (id),
    key_id INTEGER REFERENCES keys (id)
);
`;

async function main() {
  console.log("sending...");
  const client = new Client({
    connectionString: `${argv[2]}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
