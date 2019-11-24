export function Parser(promise: Promise<Response>) {
  return promise
    .then(res => res.text())
    .then(
      text =>
        new DOMParser().parseFromString(text, "text/xml").firstElementChild.innerHTML
    )
    .then(JSON.parse)
    .then(({ Table }) => Table[0]);
}
