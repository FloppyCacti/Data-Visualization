kickstarterURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
videoGamesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

fetch(videoGamesURL)
  .then((response) => response.json())
  .then((data) => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 1200 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    const svg = d3
      .select("#data-viz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const root = d3
      .hierarchy(data, (node) => node.children)
      .sum((d) => d.value)
      .sort((node1, node2) => node2.value - node1.value);

    d3.treemap().size([width, height]).padding(2)(root);

    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y1)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "black")
      .style("fill", (d) => {
        const dataColors = [
          "#00008B",
          "#B8860B",
          "#2F4F4F",
          "#008B8B",
          "#8A2BE2",
          "#DC143C",
          "#A52A2A",
          "#DEB887",
          "#D2691E",
          "#FF7F50",
          "#BDB76B",
          "#8FBC8F",
          "#E9967A",
          "#483D8B",
          "#228B22",
          "#4B0082",
          "#9370DB",
          "#48D1CC",
        ];
        const dataCategory = [
          "2600",
          "Wii",
          "NES",
          "GB",
          "DS",
          "X360",
          "PS3",
          "PS2",
          "SNES",
          "GBA",
          "PS4",
          "3DS",
          "N64",
          "PS",
          "XB",
          "PC",
          "PSP",
          "XOne",
        ];

        let category = d.data.category;

        const index = dataCategory.indexOf(category);
        return index >= 0 ? dataColors[index] : "#000000";
      });

    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      })
      .attr("y", function (d) {
        return d.y0 + 20;
      })
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "15px")
      .attr("fill", "white");

    console.log(root);
  })
  .catch((err) => console.error(err));
