fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const w = 1200;
    const h = 700;
    const padding = 50;

    const xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.Year), d3.max(data, (d) => d.Year)])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Seconds), d3.max(data, (d) => d.Seconds)])
      .range([h - padding, padding]);
    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => h - yScale(d.Seconds))
      .attr("r", 5);

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
