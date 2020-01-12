export default class Influx {
  Last = '-1m'
  First() {
function Tags() {
            const tags = data.slice(3, 5)
                .map(x => x.slice(9));

            return tags[0].reduce((accum, cur, i) => {
                accum[cur] = tags[1][i];
                return accum;
            }, {});
        }
  }

  constructor(Query: (string)=>string) {

  }

  Push(Datasets) {

  } 
}