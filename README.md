# fillTomorrow

## 내일채움 계산기 

- 년도, 가입일을 입력하면 총 납부 금액, 해지 시 금액, 남은 기간 등을 알려주는 앱
- 가입 일을 알 수 있게 도와주는 onboard 혹은 팝업창 추가 예정
- 가입일과 년도를 입력 할 수 있는 팝업 창 추가 예정


# 💡 Background

Side Project 로 개발한 의정부 고등학교 졸업 사진 서비스 입니다. 의정부고등학교 졸업생들의 사진을 조회하고, 새로운 컨셉을 제안하고, 최고의 졸업사진을 뽑는 컨테스트에 투표할 수 있습니다.

GitLab Issue 를 이용해서 태스크 관리를 진행했으며, 자세한 기획 문서는 여기 있습니다. 

[UJS 기획 문서](https://www.notion.so/UJS-486e8eca78ac4e45b51d7d52ce3b0095)

---

# 🛠 Development

- Back-end

Django 와 Python 를 사용하여 백엔드 개발을 진행했습니다. 도커 컨테이너를 이용해 서버와 로컬에서 같은 환경을 유지할 수 있도록 만들었습니다. nginx 리버스 프록시, 자동 인증서 발급, 무중단 배포 등의 설정을 했습니다. 

DRF 를 이용해서 각 모델들을 serialize 해주도록 해줬으며, SerializerMethodField 를 이용해 comment_count, liked, is_deleted 에 따른 컨텐츠 필터링 등을 처리했습니다. validate 함수를 이용해 권한을 체크하도록 만들었습니다.

IP 기반으로 댓글/좋아요/페이지 뷰 기능 등을 구현했습니다. 중복 페이지 뷰를 막기 위해서 가장 최근에 접속한 기록을 데이터베이스에 쌓고 비교를 통해 중복 조회를 막았습니다.

댓글 답글을 구현하기 위해 아래와 같이 필드를 설정했습니다. 또한 댓글을 불러올 때 prefetch_related 를 이용해 eager loading 을 구현했습니다.

```jsx
parent = models.ForeignKey('self', default=None, null=True, on_delete=models.PROTECT, related_name='children')
```

boto3 을 이용해 졸업 사진을 s3에 올리도록 했습니다.

- Front-end

react-create-app 과 typescript 을 이용해서 개발했습니다. immutable Record 들을 이용해서 렌더링을 감지하고, 비동기 함수는 saga 를 통해 event listening 하게 했습니다.

visible, openModal, closeModal 같이 관심사를 분리할 수 있는 부분은 React HOC 기법을 이용해 추출했습니다. 

```jsx
import React from 'react';

import getDisplayName from 'src/utils/getDisplayName';
import {Optionalize} from "./Optionalize";

export interface ModalProps {
    visible: boolean;
    hideModal: () => void;
}

export interface WithVisibleProps {
    visible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

export function withVisible<T extends WithVisibleProps = WithVisibleProps>
(WrappedComponent: React.ComponentType<T>) {
    return class EnhancedComponent extends React.Component<
        Optionalize<T, WithVisibleProps>
        > {
        public static displayName = `WithVisible(${getDisplayName(
            WrappedComponent,
        )})`;
        state = {
            visible: false,
        };

        showModal = () => {
            this.setState({visible: true});
        };

        hideModal = () => {
            this.setState({visible: false});
        };

        render() {
            const {visible} = this.state;

            return (
                <WrappedComponent
                    visible={visible}
                    showModal={this.showModal}
                    hideModal={this.hideModal}
                    {...(this.props as T)}
                />
            );
        }
    }
}
```

## Tech Stack

- Back-end
    - Django
    - DRF
    - docker-compose
    - aws s3, ec2
    - ECS, ECR
    
- Front-end
    - React
    - typescript
    - redux
    - redux-saga
    - ~~aws-amplify~~ → SSR 때문에 Next

## Features & Screens

### Home (졸업사진 리스트 페이지)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3f296f74-fd91-4a27-8eaa-b29162a4af98/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3f296f74-fd91-4a27-8eaa-b29162a4af98/Untitled.png)

- 졸업사진을 조회하고, 좋아요 할 수 있는 페이지입니다.
- 입력한 태그에 따라서 검색 기능을 지원합니다.

### Suggestion List Page

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3740d58-4b92-435d-b352-d2553ec8ef3a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3740d58-4b92-435d-b352-d2553ec8ef3a/Untitled.png)

- 제안들을 조회할 수 있습니다. 조회 수, 좋아요 수, 댓글 수를 내려줍니다.

### Suggestion Detail

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5dfa9b0a-9ee4-4995-81bc-8aa35f0f12ba/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5dfa9b0a-9ee4-4995-81bc-8aa35f0f12ba/Untitled.png)

- 제안을 조회할 수 있는 페이지입니다. parent 가 Null인 root_comments 들을 가져와서 뿌려주는데, 이 때 children comments 들도 모두 가져와서 내려줍니다.
- 현재 ip가 각 댓글들을 좋아했는지 여부도 포함해서 내려줍니다.
- soft_delete 로 제거하고 있기 때문에, 제거한다면 댓글이 제거되었습니다 라고 데이터를 마스킹해서 내려주도록 만들었습니다.

### Suggestion Create Page

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37ed4e07-983d-44dc-b1fd-704ea26ae4f9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37ed4e07-983d-44dc-b1fd-704ea26ae4f9/Untitled.png)

- 제안을 생성할 수 있는 웹 에디터 화면입니다. jodit 이라는 라이브러리를 썼는데, 내부 내용을 바꿀 때마다 컴포넌트가 리렌더링되면 성능 이슈가 있어서 컨텐츠가 변경되어도 shouldComponentUpdate 가 돌지 않도록 만들었습니다.

---

# 🛫 Result

- 2020년 7월 배포되었다가, 서버 비용이 많이 나가서 꺼놨습니다. [https://uijolsa.com](https://uijolsa.com)

배포 버젼 스크린샷입니다. 직접 마케팅도 돌려봤는데, 월 이용자 2천 명 정도로 광고 수익이 나지는 않았습니다...

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd05801e-f829-49f3-94d3-0c6e3ad00002/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd05801e-f829-49f3-94d3-0c6e3ad00002/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e51b0393-1e18-47e9-b8f8-2116c7da4bff/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e51b0393-1e18-47e9-b8f8-2116c7da4bff/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33b459d3-2556-417c-8258-73b162915250/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33b459d3-2556-417c-8258-73b162915250/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96a74030-1204-4c95-9e2a-89e8794345ab/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96a74030-1204-4c95-9e2a-89e8794345ab/Untitled.png)

- [https://api.uijolsa.ml/swagger/](https://api.uijolsa.tk/swagger/) 에 문서화된 API도 있습니다
