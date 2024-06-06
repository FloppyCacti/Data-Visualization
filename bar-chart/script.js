import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

fetch("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    .then(arr => console.log(arr.data[1]))
    .catch(error => console.error(error));