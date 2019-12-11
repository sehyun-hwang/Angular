import { Component, OnInit, ViewChildren } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "",
  templateUrl: "./Community.component.html",
  styleUrls: ["./Community.component.css"]
})
export class Community implements OnInit {
  @ViewChildren("month") Months_Input;

  constructor(private sanitizer: DomSanitizer) {}
  Santize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  test() {
    const url = ((url: any) => {
      url = new URL(url);
      const { Mode, dong, floor, month } = this.Form;
      const searchParams = {
        dong: dong,
        month: month
      };

      if (Mode==="User") searchParams["floor"] = floor; 

      Object.keys(searchParams).forEach(key =>
        url.searchParams.append(key, searchParams[key])
      );

      return url.toString()
    }) ("https://apigateway.hwangsehyun.ga/community/aaa");
console.log(url);

    fetch(url)
      .then(res => {
        if (res.status === 200) return res.text();
        throw new Error(res.statusText);
      })
      .then(text => {
        const LastLine = text.lastIndexOf("\n");
        this.src = URL.createObjectURL(
          new Blob([text.slice(0, LastLine)], { type: "image/svg+xml" })
        );

        return new DOMParser()
          .parseFromString(text.slice(LastLine, text.length), "text/xml")
          .querySelector("json").innerHTML;
      })
      .then(JSON.parse)
      .then(data => {
        console.log(data);
      })
      .catch(console.warn);
  }

  Tab = new FormControl(1);
  ngOnInit() {
    this.Tab.valueChanges.subscribe(value => {
      this.Form.Unit = ["d", "m"][this.Tab.value];
      this.Submit();
    });
  }

  Months() {
    var string = "";
    this.Months_Input.forEach(x => (string += x.value + "-"));
    this.Form.month = string.slice(0, -1);
    this.Submit();
  }

  src: string;
  Stringify = JSON.stringify;

  Submit() {
    console.log(this.Form);
  }

  Form_Initial = {
    dong: Array.from({ length: 7 }, (x, i) => i + 101),
    floor: Array.from({ length: 10 }, (x, i) => i + 1)
  };
  Form = {
    Mode: "User",
    Unit: "d",
    dong: 101,
    floor: 1,
    month: "1-12"
  };

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
