export async function Parser(promise: Response) {
  const d = await promise.text()
    .then(
      text => new DOMParser().parseFromString(text, "text/xml").firstElementChild.innerHTML)
    .then(JSON.parse)
  return data.Table[0];
}
