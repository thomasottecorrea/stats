function calculateStatistics() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(function(num) {
        return parseFloat(num.trim());
    });

    var mean = calculateMean(numbersArray);
    var mode = calculateMode(numbersArray);
    var median = calculateMedian(numbersArray);
    var range = calculateRange(numbersArray);
    var midrange = calculateMidrange(numbersArray);
    var sampleVariance = calculateSampleVariance(numbersArray);
    var standardDeviation = calculateStandardDeviation(numbersArray)
    
    document.getElementById("mean").innerText = "Mean: " + mean;
    document.getElementById("mode").innerText = "Mode: " + mode.join(', ');
    document.getElementById("median").innerText = "Median: " + median;
    document.getElementById("range").innerText = "Range: " + range;
    document.getElementById("midrange").innerText = "Midrange: " + midrange;
    document.getElementById("sampleVariance").innerText = "Sample Variance: " + sampleVariance;
    document.getElementById("standardDeviation").innerHTML = "Standard Deviation: " + standardDeviation;
    
}

function showMeanSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var sum = numbersArray.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    var mean = (sum / numbersArray.length).toFixed(2);

    document.getElementById("meanSteps").innerText = "Mean Calculation Steps: \n\n" +
        "- Add all the values in the list: " + numbersArray.sort((a, b) => a - b).join(' + ') + "\n" +
        "- Count the number of values: " + numbersArray.length + "\n" +
        "- Divide the sum by the number of values: (" + numbersArray.join(' + ') + ") / " + numbersArray.length;

}

function showModeSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var frequency = {};
    numbersArray.forEach(function (number) {
        frequency[number] = (frequency[number] || 0) + 1;
    });

    var modes = [];
    var maxFrequency = 0;

    for (var number in frequency) {
        if (frequency.hasOwnProperty(number)) {
            if (frequency[number] > maxFrequency) {
                modes = [number];
                maxFrequency = frequency[number];
            } else if (frequency[number] === maxFrequency) {
                modes.push(number);
            }
        }
    }

    document.getElementById("modeSteps").innerHTML = "Mode Calculation Steps: <br> <br>" +
        "- Count the frequency of each value in the list <br>" +
        "List: " + numbersArray.sort((a, b) => a - b).join(' , ') + "<br>" +
        "- The mode is the value that appears more in the List<br>" +
        "<br> - If there isn't one value that repeats more, there can be multiple modes";

}

function showMedianSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var sortedNumbers = numbersArray.slice().sort(function (a, b) {
        return a - b;
    });

    var median;
    if (sortedNumbers.length % 2 === 0) {
        var middle1 = sortedNumbers[sortedNumbers.length / 2 - 1];
        var middle2 = sortedNumbers[sortedNumbers.length / 2];
        median = (middle1 + middle2) / 2;
    } else {
        median = sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    }

    document.getElementById("medianSteps").innerHTML = "Median Calculation Steps: <br> <br>" +
        "- Sort the list of numbers <br>" +
        "List: " + numbersArray.sort((a, b) => a - b).join(', ') + "<br>" +
        "- If the list has an odd number of elements, the median is the middle value <br>" +
        "- If the list has an even number of elements, the median is the average of the two middle values";

}

function showRangeSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var min = Math.min.apply(null, numbersArray);
    var max = Math.max.apply(null, numbersArray);

    // Create a string with the numbers, highlighting the highest and lowest in red
    var coloredList = numbersArray.sort((a, b) => a - b).map(function (num) {
        if (num === min || num === max) {
            return '<span style="color: red;">' + num + '</span>';
        } else {
            return num;
        }
    }).join(', ');

    document.getElementById("rangeSteps").innerHTML = "Range Calculation Steps: <br> <br>" +
        "- Find the minimum and maximum values in the list <br>" +
        "List: " + coloredList + "<br>" +
        "- Subtract the minimum value from the maximum value";

}

function showMidrangeSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var min = Math.min.apply(null, numbersArray);
    var max = Math.max.apply(null, numbersArray);

    var coloredList = numbersArray.sort((a, b) => a - b).map(function (num) {
        if (num === min || num === max) {
            return '<span style="color: red;">' + num + '</span>';
        } else {
            return num;
        }
    }).join(', ');

    document.getElementById("midrangeSteps").innerHTML = "Midrange Calculation Steps: <br> <br>" +
        "- Find the minimum and maximum values in the list <br>" +
        "List: " + coloredList + "<br>" +
        "- Add the minimum and maximum values <br>" +
        "- Divide the sum by 2";

}

function showSampleVarianceSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var mean = calculateMean(numbersArray);

    var differences = numbersArray.map(function(num) {
        return (num - mean);
    });

    var squaredDifferences = differences.map(function (diff) {
        return diff * diff;
    });

    var sumSquaredDifferences = squaredDifferences.reduce(function (acc, val) {
        return acc + val;
    }, 0);

    var nMinus1 = numbersArray.length - 1;

    // Create the steps text
    var stepsText = "Sample Variance Calculation Steps: \n\n" +
                    "- Calculate the mean of the list: " + mean + "\n" +
                    "- Subtract the mean from each number in the list: \n[" + differences.join(', ') + "]\n" +
                    "- Square the result for each number: [" + squaredDifferences.join(', ') + "]\n" +
                    "- Sum all the squared differences: " + sumSquaredDifferences + "\n" +
                    "- Divide the sum by (n - 1), where n is the number of elements in the list: " + sumSquaredDifferences + " / " + nMinus1;

    document.getElementById("sampleVarianceSteps").innerText = stepsText;
}

function showStandardDeviationSteps() {
    var numbersInput = document.getElementById("numbers").value;
    var numbersArray = numbersInput.split(',').map(Number);

    var sampleVariance = calculateSampleVariance(numbersArray);

    var stepsText = "Standard Deviation Calculation Steps: \n\n" +
        "- Calculate the sample variance \n" +
        "Sample Variance: " + sampleVariance + "\n" +
        "- Calculate the square root of the sample variance \n" +
        "Standard Deviation: √" + sampleVariance;

    document.getElementById("standardDeviationSteps").innerText = stepsText;
}


/////////////////////////////////////////////////////////////////
///////////////////////CALCULATIONS//////////////////////////////
/////////////////////////////////////////////////////////////////


function calculateMean(numbers) {
    var sum = numbers.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    return (sum / numbers.length);
}

function calculateMode(numbers) {
    var frequency = {};
    numbers.forEach(function (number) {
        frequency[number] = (frequency[number] || 0) + 1;
    });

    var modes = [];
    var maxFrequency = 0;
    for (var number in frequency) {
        if (frequency.hasOwnProperty(number)) {
            if (frequency[number] > maxFrequency) {
                modes = [number];
                maxFrequency = frequency[number];
            } else if (frequency[number] === maxFrequency) {
                modes.push(number);
            }
        }
    }

    return modes;
}

function calculateMedian(numbers) {
    var sortedNumbers = numbers.slice().sort(function (a, b) {
        return a - b;
    });

    var middle = Math.floor(sortedNumbers.length / 2);
    if (sortedNumbers.length % 2 === 0) {
        return ((sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2);
    } else {
        return sortedNumbers[middle];
    }
}

function calculateRange(numbers) {
    var min = Math.min.apply(null, numbers);
    var max = Math.max.apply(null, numbers);
    return (max - min);
}

function calculateMidrange(numbers) {
    var min = Math.min.apply(null, numbers);
    var max = Math.max.apply(null, numbers);
    return ((min + max) / 2);
}
function calculateSampleVariance(numbers) {
    // Step 1: Calculate the mean
    var mean = calculateMean(numbers);

    // Step 2: Calculate the squared difference from the mean for each number
    var squaredDifferences = numbers.map(function (num) {
        return Math.pow(num - mean, 2);
    });

    // Step 3: Sum all the squared differences
    var sumSquaredDifferences = squaredDifferences.reduce(function (acc, val) {
        return acc + val;
    }, 0);

    // Step 4: Divide the sum by (n - 1) to get the sample variance
    var sampleVariance = sumSquaredDifferences / (numbers.length - 1);

    return sampleVariance;
}

function calculateStandardDeviation(numbers) {
    var sampleVariance = calculateSampleVariance(numbers);

    var standardDeviation = Math.sqrt(sampleVariance);

    return standardDeviation;
}


