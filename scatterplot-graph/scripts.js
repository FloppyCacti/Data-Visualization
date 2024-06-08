fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const w = 1200;
    const h = 700;

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
  })
  .catch((err) => console.log(err));
