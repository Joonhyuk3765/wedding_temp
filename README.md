# 모바일 청첩장 - 준혁 ♥ 미진

2026년 10월 25일 일요일 12:30, 노블발렌티 대치에서 진행되는 결혼식의 모바일 청첩장입니다.

## 📁 파일 구조

```
wedding-invitation/
├── index.html         # 메인 HTML
├── styles.css         # 스타일
├── script.js          # 인터랙션 (슬라이더, 복사 등)
├── README.md          # 이 파일
└── images/
    ├── map-1.jpg      # 약도 (이미 포함됨)
    └── gallery/       # 갤러리 사진 폴더 (사진 추가 필요)
        ├── photo1.jpg
        ├── photo2.jpg
        └── ...
```

## 📷 사진 추가하기

1. `images/gallery/` 폴더에 본인 사진을 넣으세요 (예: `photo1.jpg`, `photo2.jpg` 등)
   - **권장 비율: 3:4 (세로형)**, 권장 해상도 1200x1600 이상
   - 형식: jpg, jpeg, png, webp 모두 가능
2. `script.js`를 열어서 상단의 `GALLERY_PHOTOS` 배열에 파일명을 추가하세요:

```javascript
const GALLERY_PHOTOS = [
  'gallery/photo1.jpg',
  'gallery/photo2.jpg',
  'gallery/photo3.jpg',
  'gallery/photo4.jpg',
  'gallery/photo5.jpg',
  'gallery/photo6.jpg',
];
```

사진이 없으면 placeholder가 표시됩니다.

## ✏️ 내용 수정하기

`index.html`에서 다음 부분을 직접 수정할 수 있습니다:

| 항목 | 위치 | 비고 |
|---|---|---|
| 신랑/신부 이름 | `<span class="cover__name">준혁</span>` | 한글 이름 |
| 부모님 이름 | `<span class="family__parents">○○○ · ○○○</span>` | 인사말 섹션 |
| 인사말 | `.greeting__body` 단락 | 원하는 문구로 수정 |
| 영문 표기 | `JOONHYUK & MIJIN` | Footer 부분 |
| Open Graph 제목/설명 | `<meta property="og:...">` | 카카오톡 공유 시 미리보기 |

계좌번호와 날짜, 장소는 이미 반영되어 있습니다.

## 🚀 GitHub Pages 배포 방법

### 방법 1: 새 저장소에 배포

1. GitHub에서 새 저장소 생성 (예: `wedding-invitation`)
2. 로컬에서:
   ```bash
   cd wedding-invitation
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<본인아이디>/wedding-invitation.git
   git push -u origin main
   ```
3. GitHub 저장소 → **Settings → Pages**
4. **Source**: `Deploy from a branch`
5. **Branch**: `main` / `/ (root)` 선택 후 **Save**
6. 약 1-2분 후 `https://<본인아이디>.github.io/wedding-invitation/` 에서 접속 가능

### 방법 2: 개인 도메인 (`<아이디>.github.io`)

1. `<본인아이디>.github.io` 라는 이름의 저장소 생성
2. 파일을 push하면 `https://<본인아이디>.github.io/` 에서 바로 접속 가능

## 📱 카카오톡 공유 미리보기

`index.html`의 `<meta property="og:image">` 태그가 미리보기 이미지를 결정합니다.
배포 후, 카카오톡 공유 시 미리보기 이미지가 나오게 하려면:

1. `images/og-thumbnail.jpg`에 800x800 정도의 대표 이미지를 넣으세요
2. (선택) [카카오 디벨로퍼스 - 디버거](https://developers.kakao.com/tool/clear/og)에서 캐시 갱신

## ✨ 주요 기능

- 📱 **모바일 최적화** (max-width 460px 컨테이너)
- 🖼️ **무한 반복 사진 슬라이더** (좌우 버튼 + 도트 + 스와이프 + 키보드 화살표)
- 📋 **계좌번호 복사** (클릭 한 번에 클립보드 복사 + 토스트 알림)
- 📍 **네이버지도/카카오맵/티맵 길찾기** 바로가기
- 🔗 **공유 기능** (Web Share API 지원 / 미지원 시 URL 복사)
- ⏰ **D-day 카운트다운**

## 🎨 디자인 커스터마이징

`styles.css` 최상단의 `:root` 변수에서 색상을 바꿀 수 있습니다:

```css
:root {
  --bg: #f5f1ea;        /* 배경 */
  --paper: #fbf8f3;     /* 종이색 */
  --ink: #2b2b27;       /* 본문 */
  --accent: #4a5d4a;    /* 포인트 (딥 그린) */
  --gold: #a08a5a;      /* 골드 라인 */
  --sun: #c44a3a;       /* 일요일 표시 */
}
```

## 📞 문의 정보 (예식장)

- **노블발렌티 대치점**: 02-539-0400
- **주소**: 서울 강남구 영동대로 325, S-TOWER

---

> 본 청첩장은 정적 사이트로, 별도의 서버나 빌드 과정 없이 GitHub Pages에 바로 배포됩니다.
