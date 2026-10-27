# 외부 코드와 도구

원본은 사용자 소유의 Figma Make 계산기 프로젝트입니다. 원본 고정 snapshot과 공개용 변경은 [출처 및 변경](docs/PROVENANCE.md)에 기록합니다.

## shadcn/ui

`src/app/components/ui/{button,input,scroll-area,tabs,utils}.tsx`는 원본에 포함된 [shadcn/ui](https://ui.shadcn.com/) 기반 컴포넌트입니다. 해당 코드의 MIT copyright 및 permission notice를 [SHADCN-LICENSE.txt](SHADCN-LICENSE.txt)에 보존했습니다. 자체 코드의 MIT 허가는 이 외부 고지를 대체하지 않습니다.

## Unsplash

원본 `ATTRIBUTIONS.md`에는 Unsplash 사진을 사용했다는 일반 고지가 있었습니다. 고정 snapshot의 실제 앱에는 사진 파일이나 Unsplash URL이 없었고, 사용하지 않는 이미지 fallback scaffold만 있었습니다. 공개 edition에는 사진 asset을 포함하지 않습니다. 따라서 특정 사진의 저작권자나 권리를 새로 추정하지 않습니다. [Unsplash 공식 라이선스](https://unsplash.com/license).

## 이름 및 아이콘

공개 edition의 모드는 단순·공학·확장·고급입니다. Casio나 Texas Instruments의 로고·제품 이미지를 포함하지 않으며 두 회사와 제휴하지 않습니다. 원본의 `TICalculator.tsx` 파일명은 기존 구현의 추적을 위해 유지합니다.

아이콘은 [Lucide](https://lucide.dev/license)의 ISC 라이선스 패키지에서 제공합니다. React, mathjs, Radix UI, Tailwind CSS 등 npm 의존성은 각 package의 라이선스를 따릅니다. 의존성별 고지는 설치된 package에 포함됩니다.
