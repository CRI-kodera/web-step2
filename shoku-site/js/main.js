"use strict";

// progress
const documentBody = document.querySelector('body');
let newElement = document.createElement("div");
newElement.setAttribute("class","zoomCurtainbg");
documentBody.prepend(newElement);
let coverElement = document.createElement("div");
coverElement.setAttribute("id","container");
newElement.prepend(coverElement);

documentBody.classList.add('pageOn');
setTimeout(function(){ 
    newElement.style.display = "none";
  }, 2000);


window.addEventListener("beforeunload", () => {
  documentBody.classList.add('fadeout');
  setTimeout(function(){ 
    documentBody.style.display = "none"; 
  }, 1000);
}, false);


$(window).on('load',function(){
  $(".top-content").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $(".top-content").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});



//ロゴ回転


const image = document.querySelector('.top_cake'); // ロゴ画像

// 画像を時計回りに1回転させる
image.animate(
  // 途中の状態を表す配列
  [
    { transform: 'rotate(0deg)' }, // 開始時の状態（0度）
    { transform: 'rotate(360deg)' } // 終了時の状態（360度）
  ],
  // タイミングに関する設定
  {
    fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
    duration: 30000, // 再生時間（1000ミリ秒）
    iterations: Infinity,  // アニメーションの繰り返し回数（ずっと繰り返す）
  },
);

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



//じわっ


// blurTriggerにblurというクラス名を付ける定義

// function BlurTextAnimeControl() {
//   $('.top_blurTrigger').each(function () { //blurTriggerというクラス名が
//     var elemPos = $(this).offset().top - 400;//要素より、50px上の
//     var scroll = $(window).scrollTop();
//     var windowHeight = $(window).height();
//     if (scroll >= elemPos - windowHeight) {
//       $(this).addClass('blur');// 画面内に入ったらblurというクラス名を追記
//     } else {
//       $(this).removeClass('blur');// 画面外に出たらblurというクラス名を外す
//     }
//   });
// }
// // 画面が読み込まれたらすぐに動かしたい場合の記述
// $(window).on('load', function () {
//   BlurTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
// });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


// フェードアウト

$(function () {
  // ウィンドウをスクロールしたら…
  $(window).scroll(function () {
    // ウィンドウの高さを取得
    const wHeight = $(window).height();
    // スクロールした量を取得
    const wScroll = $(window).scrollTop();
    // それぞれのblockクラスに対して…
    $(".top_difference2").each(function () {
      // それぞれのblockクラスのウィンドウからの高さを取得
      const bPosition = $(this).offset().top;
      // スクロールした量が要素の高さを上回ったら
      // その数値にウィンドウの高さを引き、最後に200pxを足す
      if (wScroll > bPosition - wHeight + 500) {
        $(this).addClass("top_philosophy");
      }
    });
  });
});


//gallery
(function () {
  window.onload = () => {
    const obj = document.querySelector("#top_gallery");
    const time = 10000;
    function animStart() {
      if (obj.classList.contains("active") == false) {
        obj.classList.add("active");
        setTimeout(() => {
          animEnd();
        }, time);
      }
    }
    function animEnd() {
      obj.classList.remove("active");
      obj.offsetWidth;
    }
    document.addEventListener("scroll", function () {
      // scroll or scrollend
      animStart();
    });
    window.addEventListener("resize", animStart);
    animStart();
  };
})();

//作品紹介

var ang = 0;

$("#prev").click(function () {
  ang = ang + 22.5;
  $("*").css("--ang", ang);
});

$("#next").click(function () {
  ang = ang - 22.5;
  $("*").css("--ang", ang);
});





//canvas

var element = document.getElementById("target");
var context = element.getContext("2d");

context.beginPath();

context.arc(950, 650, 650, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
context.fillStyle = "rgb(234,234,234)";
context.fill();



//go_top

document.querySelector('.top_gotop a').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

