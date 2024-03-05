function calculateFall() {
    const gravity = 32.2; // ft/s^2, for time calculation
    const fallHeight = parseInt(document.getElementById('fallHeight').value);
    const featherFallActive = document.getElementById('featherFall').checked;
    const levitateActive = document.getElementById('levitate').checked;
    const resistance = document.getElementById('resistance').checked;
    const monkLevel = parseInt(document.getElementById('monkLevel').value);

    // Calculate time to hit
    const timeToHit = Math.sqrt(2 * fallHeight / gravity).toFixed(2); // Rounded to 2 decimal places

    let fallSpeed = "500 feet per round (max terminal velocity)";
    let actualDamage = 0;
    let averageDamage = 0;

    // Check for conditions that negate damage
    if (featherFallActive || levitateActive) {
        actualDamage = "No damage due to magic effect";
        averageDamage = 0;
    } else {
        // Calculate damage based on fall height, capped at 20d6
        const d6Per10Feet = Math.min(Math.floor(fallHeight / 10), 20);
        averageDamage = 3.5 * d6Per10Feet; // Average roll of a d6 is 3.5
        
        // Apply Monk's Slow Fall reduction if applicable
        if (monkLevel > 0) {
            const slowFallReduction = monkLevel * 5;
            averageDamage = Math.max(0, averageDamage - slowFallReduction);
        }

        // Apply resistance
        if (resistance) {
            averageDamage /= 2;
        }

        averageDamage = averageDamage.toFixed(2);
        actualDamage = rollDice(d6Per10Feet);

        // Apply resistance to actual damage
        if (resistance) {
            actualDamage = Math.floor(actualDamage / 2);
        }
    }

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Time to Hit: ${timeToHit} seconds</p><p>Fall Speed: ${fallSpeed}</p><p>Actual Damage: ${actualDamage}</p><p>Average Damage: ${averageDamage}</p>`;
}

// Dice roller function to simulate actual damage
function rollDice(numberOfDice) {
    let total = 0;
    for (let i = 0; i < numberOfDice; i++) {
        total += Math.floor(Math.random() * 6) + 1; // Roll a d6
    }
    // Apply no damage condition if magic effects are active
    return total;
}
