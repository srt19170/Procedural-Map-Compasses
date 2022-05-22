//
//  Various utility functions.
//

//
//  Uniform random number from lo to hi.  If called with one argument,
//  should treat that as hi, with lo == 0
//
function rand(lo=0, hi=false) {
    if (!hi) {
	hi = lo;
	lo = 0;
    };
    if (isNaN(lo) || isNaN(hi)) {
	console.log('Utils.rand called with non-numbers.');
	debugger;
    };
    return lo + Math.random() * (hi - lo);
}

// Random real number in a range
// randRange(lo, hi)
// randRange([lo, hi])
// randRange(hi) lo == 0
function randRange(lo, hi=false) {
    if (!hi) {
	if (Array.isArray(lo)) {
	    hi = lo[1];
	    lo = lo[0];
	} else {
	    hi = lo;
	    lo = 0;
	};
    };
    return rand(hi, lo);
};

// Random integer from 0 to num-1
function randInt(num) {
    return Math.floor(Math.random()*num);
};

// Random integer in a range.
// randIntRange(lo, hi)
// randIntRange([lo, hi])
// randIntRange(hi) lo == 0
function randIntRange(lo, hi=false) {
    if (!hi) {
	if (Array.isArray(lo)) {
	    hi = lo[1];
	    lo = lo[0];
	} else {
	    hi = lo;
	    lo = 0;
	};
    };
    return Math.floor(randInt(hi-lo+1)+lo);
};

// rnorm is R for "random normal".  This generates a random
// number with mean 0 and std = 1.
function rnorm() {
    let rand = 0;
    for(let i = 0; i < 6; i++) {
    	rand += Math.random();
    }
    return (rand-3) / 3;
}

//  Randomly select an element from an array.
function randElement(choices) {
    let choice = Array.isArray(choices) ? choices[randInt(choices.length)] : choices;
    return choice;
};

function SyncFileReader(file) {
    let self = this;
    let ready = false;
    let result = '';

    const sleep = function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    self.readAsArrayBuffer = async function() {
        while (ready === false) {
          await sleep(100);
        }
        return result;
    };    

    const reader = new FileReader();
    reader.onloadend = function(evt) {
        result = evt.target.result;
        ready = true;
    };
    reader.readAsDataURL(file);
};

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2));
}

export default {
    rand: rand,
    randRange: randRange,
    randInt: randInt,
    randIntRange: randIntRange,
    rnorm: rnorm,
    randElement: randElement,
    SyncFileReader: SyncFileReader,
    distance: distance,
    
    dummy: null
};
