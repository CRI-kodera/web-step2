"use strict";

//canvas

var element = document.getElementById("target");
var context = element.getContext("2d");

context.beginPath();

context.arc(950, 650, 650, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
context.fillStyle = "#fff";
context.fill();


//ロゴ回転
const Aiwa = document.querySelector('.Aiwa'); // ロゴ画像

// 画像を時計回りに1回転させる
Aiwa.animate(
  // 途中の状態を表す配列
  [
    { transform: 'rotate(0deg)' }, // 開始時の状態（0度）
    { transform: 'rotate(360deg)' } // 終了時の状態（360度）
  ],
  // タイミングに関する設定
  {
    fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
    duration: 40000, // 再生時間（1000ミリ秒）
    iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
  },
);
