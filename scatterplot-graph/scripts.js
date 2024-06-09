fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const w = 1000;
    const h = 700;
    const padding = 50;
    const radius = 7;

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Year) - 1, d3.max(data, (d) => d.Year) + 1])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Seconds) - 5, d3.max(data, (d) => d.Seconds) + 5])
      .range([padding, h - padding]);
    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0f"));
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => {
      let minutes = Math.floor(d / 60);
      let seconds = d % 60;
      seconds = String(seconds).padStart(2, "0");
      return minutes + ":" + seconds;
    });
    console.log(xScale(data[0].Year));

    svg
      .selectAll("circle")
      .attr("class", "dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(d.Seconds))
      .attr("r", radius)
      .attr("data-xvalue", (d, i) => data[i].Year)
      .attr("data-yvalue", (d, i) => data[i].Time)
      .style("fill", (d, i) => {
        if (data[i].Doping == "") {
          return "GoldenRod";
        }
        return "steelblue";
      })
      .style("stroke", "black");

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

    const legendShapeSize = 17;
    svg
      .append("rect")
      .attr("x", w - 200)
      .attr("y", h - 650)
      .attr("width", legendShapeSize)
      .attr("height", legendShapeSize)
      .style("fill", "GoldenRod");
    svg
      .append("rect")
      .attr("x", w - 200)
      .attr("y", h - 620)
      .attr("width", legendShapeSize)
      .attr("height", legendShapeSize)
      .style("fill", "steelblue");
    svg
      .append("text")
      .attr("id", "legend")
      .attr("x", w - 195 + legendShapeSize)
      .attr("y", h - 653 + legendShapeSize)
      .text("No doping allegations")
      .style("font-size", "15px");
    svg
      .append("text")
      .attr("id", "legend")
      .attr("x", w - 195 + legendShapeSize)
      .attr("y", h - 623 + legendShapeSize)
      .text("Doping allegations")
      .style("font-size", "15px");
  })
  .catch((err) => console.log(err));
