document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("interaction-form");
    const drug1Input = document.getElementById("drug1");
    const drug2Input = document.getElementById("drug2");
    const resultDiv = document.getElementById("interaction-result");
    const checkButton = document.getElementById("check-interaction-button");

    checkButton.addEventListener("click", function () {
        const rx1 = drug1Input.value;
        const rx2 = drug2Input.value;

        // Construct the API request URL with the Rx numbers as parameters
        const url = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rx1}+${rx2}`;

        // Send the API request
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`HTTP error occurred: ${response.status}`);
                }
            })
            .then((data) => {
                if ('fullInteractionTypeGroup' in data) {
                    resultDiv.textContent = "Drug interaction detected.";
                } else {
                    resultDiv.textContent = "No drug interaction found.";
                }
            })
            .catch((error) => {
                resultDiv.textContent = `An error occurred: ${error.message}`;
            });
    });
});
