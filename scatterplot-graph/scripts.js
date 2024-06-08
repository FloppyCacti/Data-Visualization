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
      .scaleTime()
      .domain([
        d3.min(data, (d) => Math.floor(d.Seconds / 60)),
        d3.max(data, (d) => Math.floor(d.Seconds / 60)),
      ]);
    const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  .catch((err) => console.log(err));
