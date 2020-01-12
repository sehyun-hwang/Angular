interface Dataset {
  data: object[];
  [key: string]: any;
}

export class Influx {
  Last = "-1m";
  First() {
    function Tags() {
      const tags = data.slice(3, 5).map(x => x.slice(9));

      return tags[0].reduce((accum, cur, i) => {
        accum[cur] = tags[1][i];
        return accum;
      }, {});
    }
  }

  Datasets: Dataset[] = [
    {
      label: "Random",
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
      hidden: true
    }
  ];

  constructor(private Query: (string) => string) {}

  Influx = new Client(
    "https://us-west-2-1.aws.cloud2.influxdata.com/api/v2",
    "jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w=="
  );

  Last = "-1m";
  Done = true;
}
