d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
)
  .then((data) => {
    const w = 1400;
    const h = 800;
    const padding = 50;

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    // Parse the year to create a date object
    const parseYear = d3.timeParse("%Y");

    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(data.monthlyVariance, (d) => parseYear(d.year)),
        d3.max(data.monthlyVariance, (d) => parseYear(d.year)),
      ])
      .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);
  })
  .catch((err) => console.log(err));
