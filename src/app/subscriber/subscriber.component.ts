import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, timer, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  channelOne = 'T-Series';
  channelTwo = "PewDiePie";
  subscriberOne = 0;
  subscriberOneStr = "";
  subscriberTwo = 0;
  subscriberTwoStr = "";
  api = "<Put your API Key Here>";
  channelidOne = "UCq-Fj5jknLsUf-MWSy4_brA";
  channelidTwo = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";
  finalURLOne = "";
  finalURLTwo = "";
  difference = 0;
  differenceStr = "";
  channelLogoOneUrl = "";
  channelLogoTwoUrl = {
    url:""
  };

  sub: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.finalURLOne = "https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id="+this.channelidOne+"&key="+this.api;
    this.finalURLTwo = "https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id="+this.channelidTwo+"&key="+this.api;
    console.log(this.finalURLOne);

    this.getSubscribers();
  }

  public getSubscribers () {
    interval(600)
    .subscribe((val) => {
      this.getOneSubscriber();
      this.getTwoSubscriber();

      this.difference = this.subscriberTwo - this.subscriberOne;
      this.difference = this.difference > 0 ? this.difference : this.difference * -1;
      this.differenceStr = this.difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     });
    
  }

  public getOneSubscriber () {
    this.httpClient.get(this.finalURLOne).subscribe(
      response => {
        console.log(response["items"][0].snippet.title);
        console.log(response["items"][0].statistics.subscriberCount);
        this.channelOne = response["items"][0].snippet.title;
        this.subscriberOne = response["items"][0].statistics.subscriberCount;
        this.subscriberOneStr = this.subscriberOne.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.channelLogoOneUrl = response["items"][0].snippet.thumbnails.default.url;

        return response;
      }
    );

    return "";
  }

  public getTwoSubscriber () {
    this.httpClient.get(this.finalURLTwo).subscribe(
      response => {
        console.log(response["items"][0].snippet.thumbnails.default.url);
        console.log(response["items"][0].statistics.subscriberCount);
        this.channelTwo = response["items"][0].snippet.title;
        this.subscriberTwo = response["items"][0].statistics.subscriberCount;
        this.subscriberTwoStr = this.subscriberTwo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.channelLogoTwoUrl = response["items"][0].snippet.thumbnails.default.url;

        return response;
      }
    );

    return "";
  }

}
