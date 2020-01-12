import { Client } from "@influxdata/influx";
import { Papa } from "ngx-papaparse";

interface Dataset {
  [key: string]: any;
  data: object[];
}

export class Influx {
  Last = "-1m";

  Datasets: Dataset[] = [
    {
      label: "Random",
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
      hidden: true
    }
  ];

  constructor(private Query: (string) => string, private papa: Papa) {}

  Influx = new Client(
    "https://us-west-2-1.aws.cloud2.influxdata.com/api/v2",
    "jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w=="
  );

  Done = false;
  Labels= string[];
  Refresh(chart) {
    this.Datasets[0].data.push({
      x: Date.now(),
      y: Math.random()
    });
    return;

    if (!this.Done) return;
    this.Done = false;

    this.Influx.queries
      .execute(
        "44051e60e390121f",
        `from(bucket: "test")
          |> range(start: ${this.Last})`
      )
      .promise.then(
        data =>
          new Promise(resolve =>
            this.papa.parse(data, {
              complete: data => resolve({ data })
            })
          )
      )
      .then((data: string[][]) => {
        if (data.length > 2) return data;
        this.Done = true;
        Promise.reject();
      })
      .then(data => {
        const tags = data.slice(3, 5).map(x => x.slice(9));
        function Tags(Result: string[] | object) {
          return Result instanceof Array
            ? tags[0].reduce((accum, cur, i) => {
                accum[cur] = tags[1][i];
                return accum;
              }, {})
            : tags[0];
        }

        this.Labels = this.Datasets.map(x => x.label);
        this.Labels.forEach(label => {
          label in this.Labels ||
            this.Datasets.push({
              label,
              lineTension: 0,
              borderDash: [8, 4],
              data: []
            });
        });

        return data;
      })
      .then(data => {
        console.log(data, this.Last, data.length);

        const [Value_i, Time_i] = ["temp", "time"].map(key =>
          data[3].findIndex(x => x.indexOf(key) > 0)
        );

        const date = new Date(data[data.length - 3][Time_i]);
        date.setSeconds(date.getSeconds() + 1);
        this.Last = date.toISOString();

        for (const x of data)
          chart.data.datasets[0].data.push({
            x: x[Time_i],
            y: x[Value_i]
          });

        this.Done = true;

        chart.update({
          preservation: true
        });
      })
      .catch(console.warn);
  }
}
