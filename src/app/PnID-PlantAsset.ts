export async function Parser(promise: Promise<Response>) {
  var data = await promise.text()
    .then(
      text => new DOMParser().parseFromString(text, "text/xml").firstElementChild.innerHTML)
    .then(JSON.parse)
  data = data.Table[0];
  return data;
}
