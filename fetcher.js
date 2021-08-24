const readline = require('readline');
const fs = require('fs');
const request = require('request');

const args = process.argv.slice(2);
const url = args[0];
const filetoSave = args[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {

  if (error) {
    console.log("Requesting URL does not exist!");
    rl.close();
  } else {
    if (fs.existsSync(filetoSave)) {
      rl.question('File already exists!! To overwrite type "Y/y" or type "Q/q" to exit: ', (answer) => {
        if (answer === 'Y' || answer === 'y') {
          fs.writeFile(filetoSave, body, (err) => {
            if (err) {
              console.log("File cannot be created.");
              rl.close();
            } else {
              console.log(`Downloaded and saved ${fs.statSync(filetoSave).size} bytes to ${filetoSave}`);
              rl.close();               
            }
          });
        } else if (answer === 'Q' || answer === 'q') {
          console.log("Exit the application!");
          rl.close();
        }
      });

    } else {
      fs.writeFile(filetoSave, body, (err) => {
        if (err) {
          console.log("File cannot be created.");
          rl.close();
        } else {
        console.log(`Downloaded and saved ${fs.statSync(filetoSave).size} bytes to ${filetoSave}`);
        rl.close();  
        }
      });
    }
  }
});