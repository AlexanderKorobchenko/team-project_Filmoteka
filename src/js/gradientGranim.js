import Granim from 'Granim';

const granimInstanceHeder = new Granim({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image: {
    // source: './testHederDestop.png',
    blendingMode: 'multiply',
  },
  states: {
    'default-state': {
      gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3'],
      ],
      transitionSpeed: 7000,
    },
  },
});

const granimInstanceHederLibrary = new Granim({
  element: '#canvas-image',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image: {
    // source: '../images/testHederDestop.png',
    blendingMode: 'multiply',
  },
  states: {
    'default-state': {
      gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3'],
      ],
      transitionSpeed: 7000,
    },
  },
});

// const granimInstanceMain = new Granim({
//   element: '#canvas-image',
//   direction: 'left-right',
//   isPausedWhenNotInView: true,
//   image: {
//     // source: '../images/testHederDestop.png',
//     blendingMode: 'multiply',
//   },
//   states: {
//     'default-state': {
//       gradients: [
//         ['#29323c', '#485563'],
//         ['#FF6B6B', '#556270'],
//         ['#80d3fe', '#7ea0c4'],
//         ['#f0ab51', '#eceba3'],
//       ],
//       transitionSpeed: 7000,
//     },
//   },
// });
