## **내일채움 계산기**

# **💡 Background**

내일 채움에 대한 해지 금액, 남은 금액등을 알려주는 계산기 서비스 입니다. 년도, 가입일을 입력하여 현 정책에 맞는 총 혜택 금액, 해지금액, 남은 기단 등을 알 수 있습니다.

### 목적 및 계기

- 내일 채움을 진행 하면서 현재 정확하게 몇 일 가입을 했는지 알기 불편함.
- 내일 채움 사이트를 접속하여 공인인증서 로그인이 불편하다고 판단되어 만들기로 함.
- 매년 내일 채움 가입자가 존재하여 새로운 유저가 유입 될 여지가 많다고 판단이 됨.
- 서버가 필요 없음.
- 이외에도 내가 얼만큼 돈을 받을 수 있는지 알 수 있어 만기 시 혹은 생각 날 때 볼거라고 판단됨.

---

# **🛠 Development**

- Back-end

BackEnd에 해당하는 부분은 없습니다.

- Front-end

React-Native와 redux를 사용하여 데이터를 관리하였습니다.

파일구조는 아래와 같습니다.

```jsx
- api
- common
- constans 
- lib
- navigaiton
- screen
- state
- test
App.js
RootApp.js
```

- api: 네트워크 호출을 담당하는 것들을 apiHandler.js 에 담아 사용한다. Fetch 관련 라이브러리 검색필요
- common:
    - elements: ReactNative에서 사용되는 기본적인 엘리먼트 컴포넌트들을 작성합니다.(theme, Block, icon, input 등)
    - components: 공통적으로 사용되는 컴포넌트를 작성합니다.
- constants: image, font 같은 부분들을 작성합니다.
- lib: 앱 전반적으로 사용되는 라이브러리를 작성합니다.
- navigation: 앱 네비게이션을 관리합니다.
    - BottomTabNavigator: 바텀 탭에서 이동하는 navigation을 관리합니다.
    - StackNavigator: 바텀 탭 이외에 모든 navigation을 관리합니다.
    - RootNavigator: Drawer, AlertDialog, MediaViewer 등 화면 모든 곳에서 사용되는 navigation을 관리합니다.
- screen: 화면에 표현되는 컴포넌트를 도메인별로  관리합니다.
    - 도메인 폴더 (home) :
        - HomeScreen.js : 컴포넌트를 조합합니다. Redux와 유일하게 연결되는 컴포넌트입니다. ⇒ ReactQuery를 사용하게 되면서 ui만 배치하는 작업만 하게 될 수도 있을 것 같습니다.
        - components: Home화면에서 사용되는 컴포넌트들 입니다. 컴포넌트들을 비지니스 로직을 갖지만, 리덕스와 같은 내용은 가지고 있지 않고, HomeScreen에서 전달된 props을 사용합니다.
- state: redux 관련 폴더입니다. 사용되는 리덕스를 도메인 별이 아닌 기능별로 관리합니다.
    - 기능 폴더(input) : Action과 Reducer를 분리해서 사용합니다.
        - inputsActions.js
        - inputReducer.js
- App.js
- RootApp.js : Redux Store와 연결되는 루트 앱입니다.

---

## **Tech Stack**

- Back-end
- Front-end
    - ReactNative
    - redux

## **Features & Screens**

### InputPage

![InputScreen](https://user-images.githubusercontent.com/45157159/145537339-7382ec85-c02d-446e-b38c-266799f4c9d4.png)

- 계산에 필요한 기본값들을 입력할 수 있는 페이지입니다.

### HomeScreen **Page**

![HomeScreen](https://user-images.githubusercontent.com/45157159/145537305-733537f5-bae9-4c68-b298-2dd24d805059.png)

- 적립 금액, 해지시 계산을 할 수 있는 페이지입니다.

### SettingScreen **Page**

![SettingScreenGroup](https://user-images.githubusercontent.com/45157159/145538352-e0593afa-7713-4e0f-9439-dc8b3cc2ea5a.png)

- 기본값을 수정할 수 있는 설정 페이지 입니다.

---

# **🛫 Result**

- 사용자가 계약일을 직접 입력을 해줘야 하는 문제점이 있고, 메모장에 적어두는게 더 편하지 않을까 라는 생각을 하게 되었습니다.
- 생각보다 IOS에서 많이 다운로드를 하여 총 900명이 다운로드를 받았습니다.
