var pattern = [];
        var guess = [];
        var displayingPattern = false;

        function newPattern() {
            hideMessages();
            pattern = generatePattern();
            console.log("Generated pattern:", pattern);
            displayPattern();
            displayingPattern = true;
            setTimeout(function() {
                clearPattern();
                displayingPattern = false;
            }, 3000); // Clear the pattern after 3 seconds
            clearGuess();
        }

        function hideMessages() {
            document.getElementById("congratulation").classList.add("hidden");
            document.getElementById("failed").classList.add("hidden");
        }

        function clearPattern() {
            var table = document.getElementById("patternTable");
            // Remove background color from all cells
            table.querySelectorAll("td").forEach(function (cell) {
                cell.style.backgroundColor = "";
            });
        }

        function generatePattern() {
            var pattern = [];
            for (var i = 0; i < 4; i++) {
                var row = [];
                for (var j = 0; j < 4; j++) {
                    row.push(Math.random() < 0.5); // Randomly assign true or false (red or empty)
                }
                pattern.push(row);
            }
            return pattern;
        }

        function displayPattern() {
            var table = document.getElementById("patternTable");
            table.innerHTML = "";
            for (var i = 0; i < 4; i++) {
                var row = document.createElement("tr");
                for (var j = 0; j < 4; j++) {
                    var cell = document.createElement("td");
                    cell.style.backgroundColor = pattern[i][j] ? "red" : "white";
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
        }

        function clearGuess() {
            guess = [];
            var table = document.getElementById("guessTable");
            table.innerHTML = "";
            for (var i = 0; i < 4; i++) {
                var row = document.createElement("tr");
                for (var j = 0; j < 4; j++) {
                    var cell = document.createElement("td");
                    cell.onclick = function () {
                        if (!displayingPattern) { // Only allow clicking when not displaying pattern
                            toggleColor(this);
                        }
                    };
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
        }

        function toggleColor(cell) {
            var row = cell.parentNode.rowIndex;
            var col = cell.cellIndex;
            guess[row] = guess[row] || Array(4).fill(false); // Ensure the row exists and initialize with false values
            guess[row][col] = !guess[row][col]; // Toggle the color
            console.log("Clicked cell at row:", row, "column:", col); // Debugging
            console.log("Guess:", guess); // Debugging
            cell.style.backgroundColor = guess[row][col] ? "red" : "white";
        }

        function checkGuess() {
            if (arraysEqual(pattern, guess)) {
                document.getElementById("congratulation").classList.remove("hidden");
                document.getElementById("container").classList.add("celebrate");
            } else {
                document.getElementById("failed").classList.remove("hidden");
            }
        }

        function arraysEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            for (var i = 0; i < arr1.length; i++) {
                if (!arr1[i].every((val, index) => val === arr2[i][index])) {
                    return false;
                }
            }
            return true;
        }

        // Initial setup
        newPattern();
