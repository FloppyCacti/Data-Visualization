kickstarterURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
videoGamesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

fetch(videoGamesURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error(err));
