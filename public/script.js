/* global math, Plotly */ // Declare globals so ESLint doesn't raise "no-undef" errors

// Function to add an input field for a new equation
function addEquation() {
    const container = document.getElementById('equations-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'equation';
    input.placeholder = 'Enter your equation (e.g., y = x^2)';
    container.appendChild(input);
}

// Function to plot the graph based on input equations
function plotGraph() {
    const equations = document.getElementsByClassName('equation');
    const data = [];
    
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    
    for (let i = 0; i < equations.length; i++) {
        const equation = equations[i].value;

        if (!equation) {
            alert("Please enter an equation.");
            return;
        }

        const match = equation.match(/y\s*=\s*(.*)/);
        if (!match) {
            alert("Please enter a valid equation in the form y = f(x).");
            return;
        }

        const func = match[1];
        const xValues = [];
        const yValues = [];
        
        for (let x = xMin; x <= xMax; x += 0.1) {
            xValues.push(x);
            try {
                const y = math.evaluate(func, { x });
                yValues.push(y);
            } catch (e) {
                alert("Error in equation evaluation. Make sure it's a valid mathematical expression.");
                return;
            }
        }

        data.push({
            x: xValues,
            y: yValues,
            type: 'scatter',
            name: equation
        });
    }

    // Configuration to disable the mode bar
    const config = {
        displayModeBar: false
    };

    // Plotting the graph using Plotly
    Plotly.newPlot('graph', data, {
        xaxis: { range: [xMin, xMax] },
        yaxis: { range: [yMin, yMax] },
        title: 'Graph Plot'
    }, config);
}


document.getElementById('add-equation-button').addEventListener('click', addEquation);
document.getElementById('plot-graph-button').addEventListener('click', plotGraph);
