/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// git statusDefine a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    d3.json("\samples.json").then((data)=> {
        // Parse and filter the data to get the sample's metadata
        var metadata = data.metadata;
        console.log(metadata);
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Specify the location of the metadata and update it
        var demographicInfo = d3.select("#sample-metadata");
        //empty previous inputs
        demographicInfo.html("");
        //append info into the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("\samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

    //Bar Chart
        //  display the top 10 OTUs found in that individual ID. 
        var top_OTU = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
        var OTU_id = top_OTU.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
        // retrieve lables for top 10 OTUs for the plot
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: "blue"},
            type: "bar",
            orientation: "h",
        };
        // create data variable to hold trace
        var data = [trace];

        // editing layout of bar chart
        var layout = {
            margin: {
                l: 75,
                r: 75,
                t: 75,
                b: 75
            }
        };


        // Create bar chart in correct location
        Plotly.newPlot("bar", data, layout);
    // Bubble Chart
        var trace2 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis: {title: "OTU ID"},
            height: 500,
            width: 750
        };

        // creating data variable 
        var data2 = [trace2];

        // Create bubble chart in correct location
        Plotly.newPlot("bubble", data2, layout_2); 
    });
    
}

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("\samples.json").then((data)=> {
        console.log(data)

        // Parse and filter data to get sample names
        // Add dropdown option for each sample
        var dropdown = d3.select("#selDataset");
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Use first sample to build metadata and initial plots
        buildCharts(data.names[0]);
        buildMetadata(data.names[0]);
    });

}

function optionChanged(newSample){
    buildCharts(sample);
    buildMetadata(sample);
}

// Initialize dashboard on page load
init();

