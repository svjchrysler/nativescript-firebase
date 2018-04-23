import { Component, OnInit } from '@angular/core';

import { Button } from "ui/button"
import { EventData } from 'data/observable'

import { takePicture } from 'nativescript-camera'

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  public saveToGallery: boolean = true;
  public keepAspectRatio: boolean = true;
  public width: number = 300;
  public height: number = 300;

  constructor() {  } 

  counter: number = 0

  onTap(args: EventData) {
    let button = <Button>args.object;

    this.counter++;
    /* alert("Tapped " + this.counter + " times!"); */

    let options = {
      width: this.width,
      height: this.height,
      keepAspectRatio: this.keepAspectRatio,
      saveToGallery: this.saveToGallery
  };

  takePicture(options)
      .then(imageAsset => {
          console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
      }).catch(err => {
          console.log(err.message);
      });


  }

  ngOnInit() { }


}
