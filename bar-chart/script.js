fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const w = 1200;
    const h = 500;
    const padding = 30;
    const bar_width = 3;

    const dataset = data.data;
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

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
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("x", (d, i) => i * (bar_width + 1) + padding)
      .attr("y", (d) => yScale(d[1]))
      .attr("fill", "blue");
  })
  .catch((error) => console.error(error));
