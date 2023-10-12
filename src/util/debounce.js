export function debounce(fn, delay) {
    let timeoutID;

    const debounced =  function (...args) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };

    debounced.cancel = function () {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };



    return debounced;


  }