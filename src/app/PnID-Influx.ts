import { Client } from "@influxdata/influx";
import { Papa } from "ngx-papaparse";


interface Data {
  x: string|number;
  y: number;
}
interface Dataset {
  [key: string]: any;
  data: Data[];
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
  Labels: string[];
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
      .then((data: (string|number)[][]) => {
        console.log(data, data.length, this.Last);
        if (data.length > 2) return data;
        this.Done = true;
        Promise.reject();
      })
      .then((data: (string|number)[][]) => {
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
      .then((data: (string|number)[][]) => {
        const Result = (()=> {
        const Labels = {
          x: 5,
          y: 6,
          label: 7
        };

        const Indexes = data.reduce((accum, cur, i) => {
          cur.length === 1 && accum.push(i);
          return accum;
        }, []) as number[];
        Indexes.pop();
        console.log("Indexes:", Indexes);

        const data2 = Indexes.map((x, i) =>
          data.slice(i ? Indexes[i - 1] + 5 : 4, x) as number[][]
        );
        //console.log(data2.map(x => x.slice(0, 5)));
        const Label = data[0][Labels.label] as string;
        return data2.reduce(
          (accum, cur) => {
            accum[Label] = cur.map(x => x[Labels.y]);
            return accum;
          },
          {
            x: data2[0].map(x => x[Labels.x]),
          } as any
        );
        })() 

          this.Datasets[0].data.push({
            x: x[Time_i],
            y: x[Value_i]
          });

        {
          const date = new Date(data[data.length - 3][10]);
          date.setSeconds(date.getSeconds() + 1);
          this.Last = date.toISOString();
        }
        this.Done = true;
        chart.update({
          preservation: true
        });
      })
      .catch(console.warn);
  }
}
