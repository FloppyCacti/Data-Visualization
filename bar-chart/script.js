fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((arr) => {
    const w = 500;
    const h = 200;
    const body = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  })
  .catch((error) => console.error(error));
