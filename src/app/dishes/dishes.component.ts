import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  foods = [
    '🌭',
    '🥪',
    '🌮',
    '🥯',
    '🥞',
    '🧇',
    '🍖',
    '🍗',
    '🍔',
    '🍟',
    '🍕',
    '🌯',
    '🥙',
    '🧆',
    '🍳',
    '🥘',
    '🍲',
    '🥗',
    '🍿',
    '🦞',
    '🥮',
    '🥟',
    '🍤',
    '🍣',
    '🍝',
    '🍜',
    '🍛',
    '🍚',
    '🍙',
    '🍱',
    '🍘',
    '🍧',
    '🍨',
    '🍩',
    '🎂',
    '🍰',
    '🧁',
    '🎂',
    '🥧',
    '🍮',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const sketch = (s: any) => {
      s.preload = () => {
        // preload code
      };

      var movers = [];

      const Mover = function (emoji: string) {
        this.ingredient = emoji;
        this.location = s.createVector(s.width / 2, s.height / 2);
        this.speed = s.createVector(s.random(-5, 5), s.random(-5, 5));
        this.speed.normalize();
        this.speed.mult(s.random(5));
        this.size = s.random(15, 40);
      };

      Mover.prototype.update = function () {
        this.location.add(this.speed);
      };

      Mover.prototype.display = function () {
        s.fill(200);
        s.textSize(this.size);
        s.text(this.ingredient, this.location.x, this.location.y);
      };

      s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.background(255, 255, 255);

        for (let i = 0; i < 50; i++) {
          let ingredient = this.foods[i % this.foods.length];
          let mover = new Mover(ingredient);
          movers.push(mover);
        }

        setTimeout(() => {
          console.log('Timed out!');
          this.router.navigate(['recipes']);
          let cnv = document.body.getElementsByTagName('canvas');
          cnv[0].parentNode.removeChild(cnv[0]);
        }, 4500);
      };

      s.draw = () => {
        s.background(255, 255, 255);
        movers.forEach((mover) => {
          mover.update();
          mover.display();
        });
      };
    };

    let canvas = new p5(sketch);
  }
}
