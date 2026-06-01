/* ==========================================================================
   Wedding Invitation – Interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. PHOTO GALLERY (사진 갤러리)

     📷 사진 추가 방법:
        1) images/gallery/ 폴더에 본인 사진을 넣으세요 (예: photo1.jpg)
        2) 아래 GALLERY_PHOTOS 배열에 파일명을 추가하세요
        3) 사진이 없으면 placeholder가 자동으로 표시됩니다

     무한 반복 동작 원리:
        실제 슬라이드 앞뒤로 마지막/첫 슬라이드를 복제해두고,
        끝에 도달하면 transition 없이 원본 슬라이드로 점프합니다.
     ------------------------------------------------------------------ */
  const GALLERY_PHOTOS = [
       'gallery/photo1.jpg',
       'gallery/photo2.jpg',
       'gallery/photo3.jpg',
    // 'gallery/photo4.jpg',
    // 'gallery/photo5.jpg',
    // 'gallery/photo6.jpg',
  ];

  // 기본 placeholder 개수 (실제 사진이 없을 때)
  const PLACEHOLDER_COUNT = 6;

  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentSlideEl = document.getElementById('currentSlide');
  const totalSlidesEl = document.getElementById('totalSlides');
  const dotsContainer = document.getElementById('sliderDots');

  // 실제 사용할 사진 목록 결정
  const photos = GALLERY_PHOTOS.length > 0
    ? GALLERY_PHOTOS
    : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => null);

  const total = photos.length;
  totalSlidesEl.textContent = total;

  // ---- 슬라이드 생성 (앞뒤 클론 포함) ----
  function buildSlides() {
    const html = [];

    // 끝에 마지막 슬라이드 복제 (앞에 붙임 - prev 점프용)
    html.push(slideHTML(photos[total - 1], total - 1));

    // 원본 슬라이드들
    for (let i = 0; i < total; i++) {
      html.push(slideHTML(photos[i], i));
    }

    // 첫 슬라이드 복제 (뒤에 붙임 - next 점프용)
    html.push(slideHTML(photos[0], 0));

    sliderTrack.innerHTML = html.join('');
  }

  function slideHTML(src, idx) {
    if (src) {
      return `<div class="slide"><img src="images/${src}" alt="갤러리 사진 ${idx + 1}" loading="lazy" /></div>`;
    }
    // Placeholder
    return `
      <div class="slide slide--placeholder">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="14" width="52" height="40" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="44" cy="26" r="3" fill="currentColor"/>
          <path d="M6 44 L22 30 L34 40 L44 32 L58 44" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M28 8 L36 8 L40 14 L24 14 Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <p>PHOTO ${idx + 1}</p>
        <small>사진을 추가해주세요</small>
      </div>
    `;
  }

  // ---- 도트 생성 ----
  function buildDots() {
    const dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(`<span class="dot${i === 0 ? ' dot--active' : ''}" data-index="${i}"></span>`);
    }
    dotsContainer.innerHTML = dots.join('');

    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (!dot) return;
      const idx = parseInt(dot.dataset.index, 10);
      goTo(idx);
    });
  }

  // ---- 슬라이더 상태 ----
  // currentIndex는 "원본 인덱스" (0 ~ total-1)
  // trackIndex는 "track 상의 실제 위치" (clone 포함, 1 ~ total)
  let currentIndex = 0;
  let trackIndex = 1; // 시작은 첫 원본 슬라이드 (앞에 클론 1개 있으므로 +1)
  let isAnimating = false;

  function setTrackPosition(idx, animate = true) {
    if (!animate) {
      sliderTrack.classList.add('slider__track--no-transition');
    } else {
      sliderTrack.classList.remove('slider__track--no-transition');
    }
    sliderTrack.style.transform = `translateX(-${idx * 100}%)`;
  }

  function updateUI() {
    currentSlideEl.textContent = currentIndex + 1;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('dot--active', i === currentIndex);
    });
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex++;
    setTrackPosition(trackIndex, true);
    currentIndex = (currentIndex + 1) % total;
    updateUI();
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex--;
    setTrackPosition(trackIndex, true);
    currentIndex = (currentIndex - 1 + total) % total;
    updateUI();
  }

  function goTo(idx) {
    if (isAnimating || idx === currentIndex) return;
    isAnimating = true;
    trackIndex = idx + 1;
    setTrackPosition(trackIndex, true);
    currentIndex = idx;
    updateUI();
  }

  // ---- transition 끝났을 때 클론 → 원본 점프 ----
  sliderTrack.addEventListener('transitionend', () => {
    isAnimating = false;

    // 끝 클론에 도달 → 처음 원본으로 점프
    if (trackIndex === total + 1) {
      trackIndex = 1;
      setTrackPosition(trackIndex, false);
    }
    // 앞 클론에 도달 → 마지막 원본으로 점프
    else if (trackIndex === 0) {
      trackIndex = total;
      setTrackPosition(trackIndex, false);
    }
  });

  // ---- 버튼 이벤트 ----
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // ---- 키보드 (데스크탑) ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });

  // ---- 스와이프 (터치) ----
  let touchStartX = null;
  let touchStartY = null;
  let touchMoved = false;

  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
  }, { passive: true });

  sliderTrack.addEventListener('touchmove', (e) => {
    if (touchStartX === null) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) touchMoved = true;
  }, { passive: true });

  sliderTrack.addEventListener('touchend', (e) => {
    if (touchStartX === null || !touchMoved) {
      touchStartX = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next();
    }
    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  // ---- 초기화 ----
  buildSlides();
  buildDots();
  setTrackPosition(trackIndex, false);

  /* ------------------------------------------------------------------
     2. ACCOUNT NUMBER COPY (계좌번호 복사)
     ------------------------------------------------------------------ */
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('toast--show');
    setTimeout(() => {
      toast.classList.remove('toast--show');
    }, 1800);
  }

  function copyText(text) {
    // Modern API
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }

  document.querySelectorAll('.account__copy').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const num = btn.dataset.copy;
      copyText(num)
        .then(() => showToast('계좌번호가 복사되었습니다'))
        .catch(() => showToast('복사에 실패했습니다'));
    });
  });

  /* ------------------------------------------------------------------
     3. SHARE (공유)
     ------------------------------------------------------------------ */
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: '준혁 ♥ 미진 결혼합니다',
        text: '2026년 10월 25일 일요일 12시 30분 · 노블발렌티 대치',
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // 사용자가 취소했거나 에러 - 무시
        }
      } else {
        // 공유 API 미지원 시 URL 복사
        copyText(window.location.href)
          .then(() => showToast('청첩장 링크가 복사되었습니다'))
          .catch(() => showToast('공유에 실패했습니다'));
      }
    });
  }

  /* ------------------------------------------------------------------
     4. D-DAY COUNTDOWN
     ------------------------------------------------------------------ */
  function updateCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    const weddingDate = new Date('2026-10-25T12:30:00+09:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff < 0) {
      el.innerHTML = '<strong>결혼식이 시작되었습니다 ♥</strong>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      el.innerHTML = `준혁 & 미진의 결혼식이 <strong>D-${days}</strong> 남았습니다`;
    } else {
      el.innerHTML = `오늘은 <strong>준혁 &amp; 미진</strong>의 결혼식 날입니다 ♥`;
    }
  }

  updateCountdown();
  // 매일 자정에 갱신 (페이지 오래 열려있을 때 대비)
  setInterval(updateCountdown, 1000 * 60 * 60);
})();
