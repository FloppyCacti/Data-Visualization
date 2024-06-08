fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const w = 1380;
    const h = 200;
    const padding = 40;
    const bar_width = 4;

    const dataset = data.data;

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("width", bar_width)
      .attr("height", 100)
      .attr("x", (d, i) => {
        return i * (bar_width + 1);
      })
      .attr("y", 0)
      .attr("fill", "blue");
  })
  .catch((error) => console.error(error));
