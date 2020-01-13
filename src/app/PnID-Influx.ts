import { Client } from "@influxdata/influx";
import { Papa } from "ngx-papaparse";

import { ChartPoint } from "chart.js";
interface Data {
  [key: string]: number[];
  x: number[];
}

export class Influx {
  Last = "-1m";

  Datasets: {
    [key: string]: any;
    data: ChartPoint[];
  }[] = [
    {
      label: "Random",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
      //hidden: true,
    }
  ];

  Data = new Proxy(this.Datasets, {
    get: function(target, name) {
      return target[name].data;
    }
  });

  constructor(private Query: (string) => string) {}

  papa = new Papa();
  Influx = new Client(
    "https://us-west-2-1.aws.cloud2.influxdata.com/api/v2",
    "jUGziYHIueFTW-eqGJwfxvnwmXwRDsEd9fhCGLsm7VBS_m0OH2stYEsECQwo6J39-ZzwpgaPCSRtVvvWc0zU6w=="
  );

  Done = true;
  Tags: string[] = [];
  Labels: string[];
  Refresh(chart) {
    this.Datasets[0].data.push({
      x: Date.now(),
      y: Math.random()
    });
    console.log(this.Done);
    if (this.Done) return;
    this.Done = false;
    this.Influx.queries
      .execute(
        "44051e60e390121f",
        `from(bucket: "test")
          |> range(start: ${this.Last})`
      )
      .promise.then(data =>
        data.trim()
          ? new Promise(resolve =>
              this.papa.parse(data, {
                complete: data => resolve(data)
              })
            )
          : Promise.reject("Empty response")
      )
      .then(
        ({ data, errors }: { data: (string | number)[][]; errors: any[] }) => {
          console.log(data, data.length, this.Last);
          console.assert(errors.length === 0, errors.toString());
          if (!errors.length && data.length > 2) return data;
          this.Done = true;
          return Promise.reject();
        }
      )
      .then(
        (data: (string | number)[][]): Data => {
          {
            function Tags(Result: string[] | object) {
              const tags = data.slice(3, 5).map(x => x.slice(9));

              return Result instanceof Array
                ? tags[0].reduce((accum, cur, i) => {
                    accum[cur] = tags[1][i];
                    return accum;
                  }, {})
                : tags[0];
            }
            if (!this.Tags.length) this.Tags = Tags([]);
          }

          {
            const date = new Date(data[data.length - 3][10]);
            date.setSeconds(date.getSeconds() + 1);
            this.Last = date.toISOString();
          }

          const Labels = {
            x: 5,
            y: 6,
            label: 7
          };

          const ToSlice = data.reduce((accum, cur, i) => {
            cur.length === 1 && accum.push(i);
            return accum;
          }, []) as number[];
          ToSlice.pop();
          console.log("ToSlice:", ToSlice);

          const data2 = ToSlice.map(
            (x, i) => data.slice(i ? ToSlice[i - 1] + 5 : 4, x) as number[][]
          );
          //console.log(data2.map(x => x.slice(0, 5)));

          return data2.reduce(
            (accum, cur, i) => {
              const Label = data[i][Labels.label] as string;
              accum[Label] = cur.map(x => x[Labels.y]);
              return accum;
            },
            {
              x: data2[0].map(x => x[Labels.x])
            }
          );
        }
      )
      .then((data: Data) => {
        Object.defineProperty(data, "x", {
          enumerable: false
        });
        const { x } = data;

        Object.entries(data).forEach(([key, value], i) => {
          const temp = data.map((y, i) => ({ x: x[i], y }));
          this.Datasets[this.Labels.findIndex(key)].data.concat(temp);
        });

        this.Done = true;
        chart.update({
          preservation: true
        });
      })
      .catch(console.error);
  }
}
