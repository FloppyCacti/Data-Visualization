const countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const svg = d3.select("#map").attr("width", 1000).attr("height", 600);
const legend = d3.select("#legend").attr("width", 300).attr("height", 100);
const tooltip = d3.select("#tooltip");
let countyData;
let educationData;

d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log(countyData);

    d3.json(educationURL).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        console.log(educationData);

        svg
          .selectAll("path")
          .data(countyData)
          .enter()
          .append("path")
          .attr("d", d3.geoPath())
          .attr("class", "county")
          .attr("fill", (d) => {
            let id = d.id;
            let county = educationData.find((item) => {
              return item.fips === id;
            });

            let percent = county.bachelorsOrHigher;
            if (percent <= 20) {
              return "#c7e9c0";
            } else if (percent <= 30) {
              return "#a1d99b";
            } else if (percent <= 45) {
              return "#74c476";
            } else {
              return "seagreen";
            }
          })
          .attr("data-fips", (d) => {
            d.id;
          })
          .attr("data-education", (d) => {
            let id = d.id;
            let county = educationData.find((item) => {
              return item.fips === id;
            });
            return county.bachelorsOrHigher;
          })
          .on("mouseover", (evt, d) => {
            const [mx, my] = d3.pointer(evt);
            let id = d.id;
            let county = educationData.find((item) => {
              return item.fips === id;
            });
            const text = `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`;
            tooltip
              .attr("data-education", county.bachelorsOrHigher)
              .html(text)
              .style("left", `${evt.pageX}px`)
              .style("top", `${evt.pageY}px`)
              .style("visibility", "visible");
          })
          .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
          });
      }
    });
  }
});
