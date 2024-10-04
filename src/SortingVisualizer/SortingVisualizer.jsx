import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgos/mergeSort';
import './SortingVisualizer.css';

// The speed of the animations.
const ANIMATION_SPEED_MS = 4;

// The number of bars (value) in the array.
const NUMBER_OF_BARS = 315;

// The main color of the array bars.
const PRIMARY_COLOR = '#20B2AA';

// The color of array bars that are being compared.
const SECONDARY_COLOR = 'yellow';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < NUMBER_OF_BARS; i++) {
            array.push(randomIntFromInterval(10, 650));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            // retrieves all bars
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            // logic for color changing
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                // delays how fast the colors of the bars change
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
     }
    }

    quickSort(){

    }

    heapSort() {

    }

    bubbleSort() {

    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div  
                        className = "array-bar" 
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`}}>
                    </div>
                ))}
                 <button onClick={() => this.resetArray()}>Generate New Array</button>
                 <button onClick={() => this.mergeSort()}>Merge Sort</button>
                 <button onClick={() => this.quickSort()}>Quick Sort</button>
                 <button onClick={() => this.heapSort()}>Heap Sort</button>
                 <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
            );
        }
    }

    
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max -min + 1) + min);
    }

    function arraysEqual(array1, array2) {
        if (array1.length !== array2.length) return false;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }
