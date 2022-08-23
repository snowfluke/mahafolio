const bcrypt = require("bcrypt");

const password = process.argv.slice(2)[0];

async function generatePassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

generatePassword(password).then((res) =>
  console.log(
    `Salin dan tempel ke db mongodb collection admin\n=======> ${res}`
  )
);
