import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "",
  templateUrl: "./Community.component.html",
  styleUrls: ["./Community.component.css"]
})
export class Community implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}
  public Santize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  test() {
    const url = new URL("https://apigateway.hwangsehyun.ga/community/aaa");
    const searchParams = {
      dong: "102",
      floor: "3-8",
      month: "5-8"
    };
    Object.keys(searchParams).forEach(key =>
      url.searchParams.append(key, searchParams[key])
    );

    fetch(url.toString())
      .then(data=>data.json())
      .then(console.log)
  }

  Form_Initial = {
    dong: Array.from({ length: 7 }, (x, i) => i + 101),
    floor: Array.from({ length: 10 }, (x, i) => i + 1)
  };

  Tab = new FormControl(1);
Months(event) {
console.log(event)
}

  src: string;
  data: object;
  ngOnInit() {
    this.Tab.valueChanges.subscribe(value => {
      this.Form.Unit = ["d", "m"][this.Tab.value];
      this.Submit();
    });

    const Fetch = fetch("https://www.hwangsehyun.ga/Community/figure.svg");

    Fetch.then(data => data.clone().blob()).then(
      blob => (this.src = URL.createObjectURL(blob))
    );

    Fetch.then(data => data.text())
      .then(
        text =>
          new DOMParser()
            .parseFromString(text, "text/xml")
            .querySelector("json").innerHTML
      )
      .then(JSON.parse)
      .then(text => {
        console.log(text);
      });
  }

  Form = {
    Mode: "User",
    Unit: "d",
    dong: 101,
    floor: 1
  };
  Stringify = JSON.stringify;
  Submit() {
    console.log(this.Form);
  }

  Devices = [
    {
      EN: "humidifier",
      KR: "가습기"
    },
    {
      EN: "light",
      KR: "무드등"
    }
  ];
}
