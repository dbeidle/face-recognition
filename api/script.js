const fs = require("fs");

fs.readFile("./file.txt", (err, data) => {
  if (err) {
    console.log("You fucked up");
  } else {
    console.log(data.toString());
  }
});

// Append to file with new line
// fs.appendFile("./file.txt", "\r\n What you call me??", (err) => {
//   if (err) {
//     console.log("You fucked up again");
//   }
// });

// Write to a new file
fs.writeFile("file2.txt", "Get the fuck outta here, bitch", (err) => {
  if (err) {
    console.log("You fucked up");
  }
});

fs.unlink("./file2.txt", (err) => {
  if (err) {
    console.log("You fucked up yet again...");
  } else {
    console.log("Bye Felecia!");
  }
});
