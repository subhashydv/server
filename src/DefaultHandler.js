const bodySeparator = Buffer.from('\r\n\r\n');

const separateFields = (content, boundary) => {
  const fields = [];
  let remContent = content;

  while (remContent.includes(boundary)) {
    const index = remContent.indexOf(boundary);
    fields.push(remContent.slice(0, index));
    remContent = remContent.slice(index + boundary.length);
  }

  return fields.slice(1);
};

const splitOn = (param, sep1, sep2) => {
  const params = param.split(sep1);
  return params.flatMap(param => param.split(sep2));
};

const parseHeader = header => {
  const headers = {};
  const params = splitOn(header, ';', '\r\n');
  params.forEach(param => {
    const [name, value] = splitOn(param, '=', ':');
    headers[name.trim()] = value.trim().replaceAll('"', '');
  })
  return headers;
};

const splitHeaderAndBody = (field, bodySeparator) => {
  const index = field.indexOf(bodySeparator);
  const headerString = field.slice(2, index).toString();
  const header = parseHeader(headerString);
  const body = field.slice(index + 4, field.length - 2);
  return { header, body }
};


const splitFields = (params, bodySeparator) => {
  const fields = [];
  params.forEach(param => {
    fields.push(splitHeaderAndBody(param, bodySeparator));
  });
  return fields;
};

const multiPartParser = (content, boundary, bodySeparator) => {
  const params = separateFields(content, boundary);
  return splitFields(params, bodySeparator);
};

const getBoundary = req => {
  const contentType = req.headers['content-type'];
  return Buffer.from('--' + contentType.split('=')[1]);
};


const parseForm = (req, res, next) => {
  if (req.method !== 'POST') {
    next();
    return;
  }
  let buffer = [];
  req.on('data', chunk => buffer = [...buffer, ...chunk]);

  req.on('end', () => {
    const boundary = getBoundary(req);
    const data = Buffer.from(buffer);
    req.formData = multiPartParser(data, boundary, bodySeparator);
    next();
  });
};

const logHandler = (req, res, next) => {
  console.log(req.method, ' : ', req.url.pathname);
  next();
};

const errorHandler = (req, res) => {
  res.statusCode = 404;
  res.end('Error 404');
  return true;
};

module.exports = { parseForm, logHandler, errorHandler }