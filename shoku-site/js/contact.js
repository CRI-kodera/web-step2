"use strict";

// チェックボックス関係
document.addEventListener('DOMContentLoaded', function () {
  let checkbox = document.getElementById('consent');
  let privacyPolicy = document.querySelector('.PrivacyPolicy');
  let closeButton = document.querySelector('.close-button');
  let form = document.getElementById('contactForm');

  // チェックボックスの変更時のイベントリスナー
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // チェックされている場合は表示
      fadeInPrivacyPolicy();
    } else {
      // チェックされていない場合は非表示
      fadeOutPrivacyPolicy();
    }
  });

  // 閉じるボタンのクリック時のイベントリスナー
  closeButton.addEventListener('click', function () {
    fadeOutPrivacyPolicy();
  });

  // 送信ボタンのクリック時のイベントリスナー
  form.addEventListener('submit', function (event) {
    let inputs = form.querySelectorAll('input[type="text"], input[type="email"], select, textarea');
    let errorMessages = [];

    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('error');
        let label = document.querySelector(`label[for="${input.id}"]`).textContent;
        errorMessages.push(`＊ ${label} を入力してください`);
      } else {
        input.classList.remove('error');
      }
    });
    // プライバシーポリシーに同意のチェック
    if (!checkbox.checked) {
      event.preventDefault(); // 送信を中止
      errorMessages.push('＊ プライバシーポリシーに同意が必要です');
    }

    if (errorMessages.length > 0) {
      event.preventDefault(); // 送信を中止
      showErrorMessages(errorMessages);
    }
  });

  function showErrorMessages(messages) {
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('form_error');
    errorDiv.innerHTML = messages.join('<br>');
    form.insertBefore(errorDiv, form.querySelector('.form_bottons'));
  }
});

function fadeInPrivacyPolicy() {
  let privacyPolicy = document.querySelector('.PrivacyPolicy');
  privacyPolicy.style.display = 'block';
}

function fadeOutPrivacyPolicy() {
  let privacyPolicy = document.querySelector('.PrivacyPolicy');
  privacyPolicy.style.display = 'none';
};




//canvas

var element = document.getElementById("target");
var context = element.getContext("2d");

context.beginPath();

context.arc(750, 650, 650, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
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

