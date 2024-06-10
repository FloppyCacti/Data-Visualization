d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
)
  .then((data) => {
    const maxYear = d3.max(data.monthlyVariance, (d) => d.year);
    const minYear = d3.min(data.monthlyVariance, (d) => d.year);
    const w = 1400;
    const h = 800;
    const padding = 60;
    const base = data.baseTemperature;

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    const parseYear = d3.timeParse("%Y");
    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(data.monthlyVariance, (d) => parseYear(d.year)),
        d3.max(data.monthlyVariance, (d) => parseYear(d.year)),
      ])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleTime()
      .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
      .range([padding, h - padding]);

    svg
      .selectAll("rect")
      .data(data.monthlyVariance)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => base + d.variance)
      .attr("fill", (d) => {
        if (base + d.variance <= 3.9) {
          return "blue";
        } else if (base + d.variance <= 5) {
          return "lightblue";
        } else if (base + d.variance <= 6.1) {
          return "lightskyblue";
        } else if (base + d.variance <= 7.2) {
          return "lightblue";
        } else if (base + d.variance <= 8.3) {
          return "lightyellow";
        } else if (base + d.variance <= 9.5) {
          return "tomato";
        } else {
          return "firebrick";
        }
      })
      .attr("height", (h - 2 * padding) / 12)
      .attr("y", (d) => yScale(new Date(0, d.month - 1, 0, 0, 0, 0, 0)))
      .attr("width", (w - 2 * padding) / (maxYear - minYear))
      .attr("x", (d) => xScale(new Date(d.year, 0, 0, 0, 0, 0, 0)));

    // add x and y axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  })
  .catch((err) => console.log(err));
