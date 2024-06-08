fetch("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
  .then((response) => response.json())
  .then((data) => {
    const w = 1300;
    const h = 500;
    const padding = 50;
    const bar_width = 3;

    const dataset = data.data.map((d) => [new Date(d[0]), d[1]]);
    const xScale = d3
      .scaleTime()
      .domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("class", "bar")
      .attr("width", bar_width)
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("fill", "blue")
      .on("mouseover", (evt, d) => {
        const [mx, my] = d3.pointer(evt);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const text = `date: ${months[d[0].getMonth()]} ${d[0].getUTCFullYear()}\n GDP: ${d[1]}`;
        tooltip
          .html(text)
          .style("left", `${evt.pageX}px`)
          .style("top", `${evt.pageY - 60}px`)
          .style("visibility", "visible");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

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

    const tooltip = d3.select("#tooltip").append("text").attr("id", "tooltip").attr("fill", "black").style("visibility", "hidden");
  })
  .catch((error) => console.error(error));
