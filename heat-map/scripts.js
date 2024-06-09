d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
)
  .then((data) => {
    const w = 1400;
    const h = 800;
    const padding = 50;

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
  })
  .catch((err) => console.log(err));
