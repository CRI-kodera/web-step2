"use strict";

// progress　初回のみ表示
window.addEventListener("load", () => {
  const hasVisited = localStorage.getItem("hasVisited");

  const finishLoading = () => {
    document.documentElement.classList.add("loaded");
    document.body.classList.add("loaded");
  };

  if (hasVisited) {
    finishLoading();
  } else {
    setTimeout(() => {
      finishLoading();
      localStorage.setItem("hasVisited", "true");
    }, 2300);
  }
});

window.addEventListener(
  "beforeunload",
  () => {
    document.body.classList.add("fadeout");
    setTimeout(function () {
      document.body.style.display = "none";
    }, 1000);
  },
  false,
);

//ロゴ回転

const heroCake = document.querySelector(".p-top-main__cake"); // ロゴ画像

// 画像を時計回りに1回転させる
if (heroCake) {
  heroCake.animate(
    // 途中の状態を表す配列
    [
      { transform: "rotate(0deg)" }, // 開始時の状態（0度）
      { transform: "rotate(360deg)" }, // 終了時の状態（360度）
    ],
    // タイミングに関する設定
    {
      fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
      duration: 30000, // 再生時間（1000ミリ秒）
      iterations: Infinity, // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
}

//ロゴ回転
const academyImage = document.querySelector(".p-site-footer__academy-image"); // ロゴ画像

// 画像を時計回りに1回転させる
if (academyImage) {
  academyImage.animate(
    // 途中の状態を表す配列
    [
      { transform: "rotate(0deg)" }, // 開始時の状態（0度）
      { transform: "rotate(360deg)" }, // 終了時の状態（360度）
    ],
    // タイミングに関する設定
    {
      fill: "backwards", // 再生前後の状態（再生前、開始時の状態を適用）
      duration: 40000, // 再生時間（1000ミリ秒）
      iterations: Infinity, // アニメーションの繰り返し回数（ずっと繰り返す）
    },
  );
}

function revealOnScroll() {
  const elements = document.querySelectorAll(".p-top-main__about");
  if (!elements.length) {
    return;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.65,
      },
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    const checkVisibility = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        if (scrollY > elementTop - windowHeight + 100) {
          el.classList.add("is-visible");
        }
      });
    };

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("load", checkVisibility);
  }
}

revealOnScroll();

//作品紹介

var ang = 0;

$("#slider-prev").click(function () {
  ang = ang + 22.5;
  $("*").css("--ang", ang);
});

$("#slider-next").click(function () {
  ang = ang - 22.5;
  $("*").css("--ang", ang);
});

//canvas

var element = document.getElementById("target");

if (element) {
  var context = element.getContext("2d");

  context.beginPath();

  context.arc(950, 650, 650, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
  context.fillStyle = "rgb(234,234,234)";
  context.fill();
}

//go_top

const pageTopLink = document.querySelector(".p-top-main__page-top a");

if (pageTopLink) {
  pageTopLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
