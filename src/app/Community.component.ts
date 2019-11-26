import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "",
  templateUrl: "./Community.component.html",
  styleUrls: ["./Community.component.css"]
})
export class Community implements OnInit {
  Form_Initial = {
    dong: Array.from({length: 7}, (x, i) => i+101),
    floor: Array.from({length: 10}, (x, i) => i+1)
  };

  Tab = new FormControl(0);
  ngOnInit() {
    this.Tab.valueChanges.subscribe(value => {
      this.Form.Unit = this.Tab.value;
      this.Submit();
    });
  }

  Form = {
    Mode: "User",
    Unit: 0,
    dong: 101,
    floor: 1
  };

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
