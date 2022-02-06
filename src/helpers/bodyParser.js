function bodyParser(request, callback) {
  let body = ""

  // isso aqui é um event listener que houve pedaços dos dados que vão chegando, os chunks,
  // isso porque é assim que o node recebe infos de body, através de streams
  // ou seja, nos métodos que tem body, como POST, PUT e PATCH, sempre vamos ter que fazer isso
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    request.body = body;
    callback()
  })
}

module.exports = bodyParser