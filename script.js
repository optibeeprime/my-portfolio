document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.getElementById("carousel");
  const cards = document.querySelectorAll(".carousel .work-card");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  const listBtn = document.getElementById("listBtn");
  const workList = document.getElementById("workList");
  const backBtn = document.getElementById("backToSlide");

  let currentIndex = 0;

  // ===== カード幅 =====
  function getCardWidth() {
    return cards[0].getBoundingClientRect().width + 40;
  }

  // ===== 指定カードへスライド =====
  function slideTo(index) {
    const pos = index * getCardWidth();
    carousel.scrollTo({ left: pos, behavior: "smooth" });
    applyFocus();
  }

  // ===== 中央カードを拡大 =====
  function applyFocus() {
    const center = carousel.scrollLeft + carousel.clientWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      const distance = Math.abs(center - mid);

      const scale = Math.max(1, 1.18 - distance / 500);
      card.style.transform = `scale(${scale})`;
    });
  }

  // ===== 自動スライド =====
  function autoSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    slideTo(currentIndex);
    setTimeout(autoSlide, 2400);
  }
  setTimeout(autoSlide, 1500);

  // ===== 矢印操作 =====
  leftBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    slideTo(currentIndex);
  };
  rightBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    slideTo(currentIndex);
  };

  // ===== 一覧ボタン =====
  listBtn.onclick = () => {
    document.querySelector(".carousel-container").classList.add("hidden");
    workList.classList.remove("hidden");
  };

  // ===== スライダーに戻る =====
  backBtn.onclick = () => {
    workList.classList.add("hidden");
    document.querySelector(".carousel-container").classList.remove("hidden");
  };

  // ===== スクロールでフォーカス更新 =====
  carousel.addEventListener("scroll", applyFocus);

  // 初回フォーカス
  applyFocus();

});
