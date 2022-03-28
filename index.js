const fs = require("fs");

fs.readFile("input.txt", function (err, data) {
  if (err) throw err;
  let tri = [];
  const arr = data.toString().replace(/\r\n/g, "\n").split("\n");
  for (var i = 0; i < arr.length; i++)
    tri.push(
      arr[i]
        .toString()
        .split(" ")
        .map(function (item) {
          return parseInt(item, 10);
        })
    );

  const isPrime = (num) => {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return num !== 1;
  };

  function maxPathSum(tri, m, n) {
    let maxPath = 0;
    if (isPrime(tri[0][0])) return 0;
    for (let i = 1; i <= m; i++) {
      for (let j = 0; j <= i; j++) {
        if (isPrime(tri[i][j])) tri[i][j] = -1;
        else if (j == 0) {
          if (tri[i - 1][j] != -1) tri[i][j] += tri[i - 1][j];
          else tri[i][j] = -1;
        } else if (tri[i - 1][j] > tri[i - 1][j - 1])
          tri[i][j] += tri[i - 1][j];
        else tri[i][j] += tri[i - 1][j - 1];

        maxPath = maxPath < tri[i][j] ? tri[i][j] : maxPath;
      }
    }

    return maxPath;
  }

  console.log(maxPathSum(tri, tri.length - 1, tri.length - 1));
});