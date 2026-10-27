# 다기능 계산기

브라우저에서 수식을 입력하거나 버튼으로 계산하는 React·TypeScript 앱입니다. 단순, 공학, 확장, 고급의 네 모드에서 사칙연산과 mathjs의 삼각함수·통계·행렬 수식을 사용합니다. API key나 서버 계정 없이 실행합니다.

## 실행

Node.js 22.12 이상이 필요합니다. 검증 환경은 Node.js 26.8.1, npm 11.19.0입니다.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run dev
```

표시된 localhost URL에 접속합니다. production bundle은 `npm run build`로 `dist/`에 생성하며 `npm run preview`로 확인합니다.

## 사용

- 수식 입력에서 Enter로 계산하고, 위/아래 방향키로 현재 모드의 기록을 탐색합니다.
- 단순 모드의 `M+`, `M-`, `MR`, `MC`는 숫자를 메모리에 더하기·빼기·불러오기·지우기 합니다.
- 공학·확장·고급 모드의 DEG/RAD 버튼은 각도 단위를 전환합니다. 초기값은 DEG입니다.
- `sin(30)`은 DEG에서 약 0.5, `sin(pi/2)`는 RAD에서 1입니다. 열린 함수 괄호는 직접 닫아야 합니다.
- 고급 모드의 통계·고급 탭에서 `mean(1,2,3)`, `det([[1,2],[3,4]])` 같은 mathjs 수식을 입력할 수 있습니다.
- `1줄`, `3줄`, `5줄`은 기록 영역의 표시 높이를 바꿉니다. 기록 자체는 현재 모드가 열려 있는 동안 유지합니다.

계산 상태는 메모리에만 있습니다. 모드를 떠나거나 새로고침하면 그 모드의 입력·기록·메모리가 초기화됩니다. 단순 모드의 `C`는 입력만, `AC`는 입력과 메모리를 지웁니다. 공학·고급 모드의 `AC`는 계산 기록도 지웁니다.

## 검증

```sh
npm run typecheck
npm test
npm run build
npm audit --audit-level=moderate
```

기존 83개와 추가 회귀 10개를 포함하여 **93개 테스트**를 실행합니다. 기존 테스트 중 25개는 mathjs를 직접 검사하는 정밀도 테스트이며 앱 전체의 정확성을 증명하지 않습니다. 추가 테스트는 같은 함수의 중첩, 역삼각함수 거듭제곱, 공백, 중복 Enter, 미구현 버튼 제외 및 focused button의 Enter 기본 동작을 검사합니다. `.github/workflows/ci.yml`은 같은 명령을 read-only 권한으로 실행합니다.

네 모드에서 입력·계산·기록·DEG/RAD 및 대표 통계·행렬 경로를 실제 브라우저로 확인했습니다. 1440×900, 1024×768, 390×844, 360×800에서 확인한 범위와 수치 한계는 [검증 기록](docs/VERIFICATION.md)에 있습니다. 모든 함수의 모든 입력을 검증했다는 의미는 아닙니다.

## 수치와 상태의 한계

기본 계산은 mathjs의 JavaScript number 연산을 따릅니다. `0.1+0.2`는 `0.30000000000000004`로 표시될 수 있고, 공학 모드는 작은 수를 지수 표기로 표시합니다. `1/0`은 `Infinity`, `0/0`은 `NaN`, 잘못된 수식은 기록에 `오류`로 표시합니다. 금전 정산이나 검증된 고정 소수점 계산용으로 설계하지 않았습니다.

production build에서 mathjs를 포함한 JavaScript chunk가 500 kB를 넘어 Vite가 크기 경고를 출력합니다. 빌드는 성공하며 경고를 숨기지 않습니다.

## 문서와 라이선스

[출처 및 변경](docs/PROVENANCE.md) · [변경 기록](CHANGELOG.md) · [외부 고지](ATTRIBUTIONS.md)

자체 코드: [MIT](LICENSE). 포함된 shadcn UI 코드는 [원래 MIT 고지](SHADCN-LICENSE.txt)를 따릅니다. Casio와 Texas Instruments의 공식 제품이나 제휴 프로젝트가 아닙니다.

공식 기술 문서: [React](https://react.dev/) · [Vite](https://vite.dev/guide/) · [mathjs expressions](https://mathjs.org/docs/expressions/) · [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs) · [Vitest](https://vitest.dev/guide/)
