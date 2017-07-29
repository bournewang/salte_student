
function build_http_query(params){
  var esc = encodeURIComponent;
  return Object.keys(params)
  .map(k => esc(k) + '=' + esc(params[k]))
  .join('&');
}
function upload_image(url, params){
  let formData = new FormData();
  for (var key in params){
    formData.append(key, params[key]);
  }
  let file = {uri: params.path, type: 'application/octet-stream', name: 'image'};
  formData.append("image", file);

  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
    body: formData,
  });
}

exports.build_http_query = build_http_query;
exports.upload_image = upload_image;
