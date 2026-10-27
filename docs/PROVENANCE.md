# 출처 및 공개 edition 범위

- 원본: 사용자 소유 `simple-calculator` main의 `077263e0998b1b2c4421e5c0e4c91d211f1c93f1` snapshot
- 추출 방식: GitHub commit archive. 기존 local checkout, uncommitted 파일, Git history는 섞지 않았습니다.
- edition: `calculator-workbench` 1.1.0
- 라이선스: 원본 README의 MIT 의도에 따라 자체 코드의 MIT 본문을 추가했습니다. shadcn 고지는 별도로 보존했습니다.

## 보존한 기능

네 계산 모드, 버튼과 수식 입력, 계산 기록 및 위/아래 키 탐색, 기본 메모리, DEG/RAD, 삼각·통계·행렬 함수 UI와 기존 83개 테스트를 보존했습니다. 사진이나 외부 API는 사용하지 않습니다.

## 수정한 동작

- Enter 이벤트가 input handler와 window handler에 두 번 전달되어 계산 기록을 중복 추가하던 문제를 수정했습니다.
- DEG 변환이 같은 삼각함수를 중첩하면 안쪽 호출을 누락하던 문제를 재귀 변환으로 수정했습니다.
- 역삼각함수 결과에 거듭제곱을 적용할 때 변환식의 우선순위를 유지합니다.
- `sin (30)`처럼 함수명과 괄호 사이의 공백을 허용합니다.
- 이 네 동작과 미구현 버튼 제외를 검사하는 회귀 테스트 10개를 추가했습니다.

- 전역 키보드 단축키가 button·tab 등에서 Enter 기본 동작을 막지 않도록 focused control과 modifier key를 제외합니다.

## 제외·정리

- 사용하지 않는 UI scaffold 43개와 이미지 fallback을 제외했습니다. 사용 중인 shadcn UI 5개 파일은 보존했습니다.
- private local path가 있는 계획 기록 `.sisyphus`, 빈 작성 지침 template을 제외했습니다.
- 원본 hosting 설정은 특정 배포를 승인하는 근거가 아니므로 제외했습니다. static `dist/`를 별도로 호스팅할 수 있습니다.
- 미구현 `ALPHA`, `STO`, `ENG`, `S⇔D`, `sto→`, `rcl` 버튼을 제외했습니다. 이 버튼들은 원본에서 작동하는 저장·표기 변환 기능이 아니었습니다.
- 제품명으로 표시하던 모드는 일반 이름으로 바꾸고 로고·제품 이미지 없이 표시합니다.
- 한국어 문서와 metadata, 수식 입력의 접근 가능한 이름, 흰색 canvas를 적용했습니다.
- 사용하지 않는 dependency를 제거하고 audit 대상 의존성을 호환되는 수정 버전으로 갱신했습니다.

## 범위의 한계

모든 mathjs 함수·입력 조합이나 실제 기기의 기능을 재현했다고 주장하지 않습니다. 초기 83개 중 정밀도 25개는 mathjs를 직접 검사하는 library 테스트입니다. 앱 hook, 컴포넌트, 브라우저 동작에 대한 검증과 구분합니다. 브라우저 기록은 네 모드의 대표 경로를 확인한 결과입니다. 원본 snapshot 전체에 대한 무수정 공개본이나 상용 계산기의 emulator가 아닙니다.
