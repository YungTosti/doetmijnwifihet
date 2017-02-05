/**
 * Created by yungtosti on 05/02/17.
 */

window.onload = executeAnimation();
var inSubAnimation = false;
var executedConnectionBarAnimation = false;
var globalCounter = 1; // Deze nepnerd begon vanaf 1 te tellen
var justCameFromSubAnimation = false;

function executeAnimation() {
    setInterval(function() {
        if (inSubAnimation) return;
        if (justCameFromSubAnimation) globalCounter++;

        toggleLineVisibility(globalCounter);

        if (globalCounter === 6 && !executedConnectionBarAnimation) {
            executeConnectionBarAnimation();
        }
        else globalCounter++;
    }, 1500);
}

function toggleLineVisibility(lineNumber) {
    jQuery('h1.line-' + lineNumber).toggleClass('invisible');
}

function executeConnectionBarAnimation() {
    inSubAnimation = true;
    executedConnectionBarAnimation = true;
    var counter = 1;
    var rounds = 0;
    var maxRounds = 1;
    var positive = true;
    var justSwitched = false;

    setInterval(function() {
        justSwitched = false;

        if (counter === 5 && positive && rounds < maxRounds) {
            positive = false;
            justSwitched = true;
        }

        if (counter === 0 && !positive && rounds < maxRounds) {
            positive = true;
            justSwitched = true;
            rounds++;
        }

        toggleConnectionBarVisibility(counter);

        if (counter === 7) {
            //We hebben de online cloud laten zien, we kunnen terug naar de normale loop
            inSubAnimation = false;
            justCameFromSubAnimation = true;
            return;
        }

        if (justSwitched) return;
        if (positive) counter++;
        else counter--;
    }, 100);
}

function toggleConnectionBarVisibility(lineNumber) {
    jQuery('.connection .wifi-' + lineNumber).toggleClass('transparent');
}