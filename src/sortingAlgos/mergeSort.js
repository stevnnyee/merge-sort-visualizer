export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array; // returns base case; no sorting
    const auxiliaryArray = array.slice(); // creates a copy the original array
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if (startIdx === endIdx) return; // base case where array is already sorted
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations); // sorts first array
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations); // sorts second array
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations); // combines the two halves
}

function doMerge(
    mainArray, 
    startIdx, 
    middleIdx, 
    endIdx, 
    auxiliaryArray, 
    animations
) {
    let k = startIdx; // start of main array
    let i = startIdx; // beginning of first array
    let j = middleIdx + 1; // beginning of second array

    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]); // Compare two numbers
        animations.push([i, j]); // Revert colors

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite with smaller value
            animations.push([k, auxiliaryArray[i]]); 
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    // checks for remaining elements in the first array
    while (i <= middleIdx) {
        // compare and change color
        animations.push([i, i]); 
        // reverts color
        animations.push([i, i]);
        // overwrites value at index k with auxiliaryArray[i]
        animations.push([k, auxiliaryArray[i]]); 
        // moves element from auxiliary array to main array
        mainArray[k++] = auxiliaryArray[i++];
    }

    // checks for remaining elements in the second array
    while (j <= endIdx) {
        // Compare and change color
        animations.push([j, j]); 
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]); 
        mainArray[k++] = auxiliaryArray[j++];
    }
}

