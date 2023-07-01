
// the start of the javascript code

// create a new table row by row id and cell id and append it to the table body by table id and return the cell element by row id and cell id and table id.
function createMatrix() {
  var matrix = document.getElementById("matrix");
  var select = document.getElementById("selectsizeofmatrix");
  var size = select.options[select.selectedIndex].value;

  if (size == "select") {
    document.getElementById("entermatrix").innerHTML = "";
    matrix.innerHTML = "";
    document.getElementById("showbtn").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("result").innerHTML = "";
  } else {
      
      // if size of the matrix is selected then show the matrix, show button and create the input field
      document.getElementById("entermatrix").innerHTML = "Enter Matrix";
      document.getElementById("showbtn").innerHTML =
        '<button onclick="finddistinct()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button>';
      document.getElementById("output").innerHTML = "Output:";
      console.log("Saurav Hathi Testing");
      matrix.innerHTML = "";
      for (var i = 0; i < size; i++) {
        var row = matrix.insertRow(i);
        for (var j = 0; j < size; j++) {
          var cell = row.insertCell(j);
          cell.innerHTML = "<input type='number' value=''/>";
        }
      }
    }
  
    clr();

}

// get the value of the matrix and return the matrix and size of the matrix
function getValue() {
  let matrix = [];
  let row = [];

  let table = document.getElementById("matrix");
  let rows = table.getElementsByTagName("tr");

  // get the value of the matrix
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].getElementsByTagName("td");
    for (let j = 0; j < cols.length; j++) {
      let input = cols[j].getElementsByTagName("input")[0];
      row.push(input.value);
    }
    matrix.push(row);
    row = [];
  }

  // convert(parse) the string to integer
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = parseInt(matrix[i][j]);
    }
  }

  let N = matrix.length;

  return [matrix, N];
}

// find the distinct elements in the matrix and return the distinct elements
function finddistinct() {

  clr();

  let [matrix, N] = getValue();

  console.log("Saurav Hathi Testing");

  // if any cell is empty then return the message
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (isNaN(matrix[i][j])) {
        alert("Please fill all the cells");
        return;
      }
    }
  }

  console.log("Matrix: ", matrix);
  console.log("Size of matrix: " + N);

  var ans = new Map();

  for (var j = 0; j < N; j++) {
    ans.set(matrix[0][j], 1);
  }

  for (var i = 1; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (ans.has(matrix[i][j]) && ans.get(matrix[i][j]) == i) {
        ans.set(matrix[i][j], i + 1);
        if (i == N - 1) {
          document.getElementById("result").innerHTML +=
            "<tr><td><input type='number' value='" +
            matrix[i][j] +
            "' /></td></tr>";
        }
      }
    }
  }

  // if no distinct element found
  if (document.getElementById("result").innerHTML == "") {
    document.getElementById("result").innerHTML =
      "<td><input type='number' value='0' class='inline' /></td>";
  }

}

// clear the old result
function clr() {
  document.getElementById("result").innerHTML = "";
}


// the end of the javascript code