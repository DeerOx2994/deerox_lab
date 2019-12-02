import React, { Component } from 'react';
import MemberList from './lol_uniq/view/MemberList';
import DefaultMember from './lol_uniq/data/DefaultMember';

class App extends Component {
  key = '10';
  state = {
    members: DefaultMember.members,
    searchKeyword: '',
    selectedMembers: [],
    leftTeamMembers: [],
    rightTeamMembers: [],
    leftTeamPoint: '',
    rightTeamPoint: '',
  };
  selectedIndexs = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  handleChange = e => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };

  handleUpdate = (key, data) => {
    const { members } = this.state;
    this.setState({
      members: members.map(memberInfo =>
        key === memberInfo.key ? { ...memberInfo, ...data } : memberInfo,
      ),
    });
  };

  handleUserInfoClick = (key, listType) => {
    console.log('handleUserInfoClick listType = ' + listType);

    const { members, selectedMembers } = this.state;

    listType === '0'
      ? this.setState({
          selectedMembers: selectedMembers.concat(
            members.filter(memberInfo => memberInfo.key === key),
          ),

          members: members.filter(memberInfo => memberInfo.key !== key),
        })
      : this.setState({
          members: members.concat(
            selectedMembers.filter(memberInfo => memberInfo.key === key),
          ),

          selectedMembers: selectedMembers.filter(
            memberInfo => memberInfo.key !== key,
          ),
        });
  };

  addUser = nickname => {
    console.log('addUser ' + nickname);

    const { members } = this.state;

    this.setState({
      members: members.concat({
        nickname: nickname,
        key: this.key++,
      }),
    });
  };

  mixMember = () => {
    console.log('mixMember');
    let { selectedMembers } = this.state;

    if (selectedMembers.length !== 10) {
      return;
    }

    let leftTeamMembers = [];
    let rightTeamMembers = [];

    //1. 선택된 멤버들을 가중치별로 정렬
    selectedMembers = this.quickSort(selectedMembers);

    //2. 각 팀당 임의의 2명을 할당
    leftTeamMembers = this.addRandomMember(selectedMembers, leftTeamMembers);
    leftTeamMembers = this.addRandomMember(selectedMembers, leftTeamMembers);
    rightTeamMembers = this.addRandomMember(selectedMembers, rightTeamMembers);
    rightTeamMembers = this.addRandomMember(selectedMembers, rightTeamMembers);

    // 3. 각 팀의 평균 점수를 비교하여 낮은 팀이 가장 높은 점수의 대기 선수를 가져간다.
    this.distributeMember(selectedMembers, leftTeamMembers, rightTeamMembers);
  };

  distributeMember = (members, leftTeamMembers, rightTeamMembers) => {
    if (leftTeamMembers.length >= 5 && rightTeamMembers.length >= 5) {
      let leftTeamPoint = 0;
      let rightTeamPoint = 0;

      for (let i = 0; i < 5; i++) {
        leftTeamPoint += leftTeamMembers[i].point;
        rightTeamPoint += rightTeamMembers[i].point;
      }

      this.setState({
        selectedMembers: members,
        leftTeamMembers: leftTeamMembers,
        rightTeamMembers: rightTeamMembers,
        leftTeamPoint: leftTeamPoint / 5,
        rightTeamPoint: rightTeamPoint / 5,
      });
      return;
    }
    let highIndex = members.length - 1;
    for (let i = highIndex; i >= 0; i--) {
      if (!this.selectedIndexs[i]) {
        this.selectedIndexs[i] = true;
        highIndex = i;
        break;
      }
    }

    let lowIndex = highIndex - 1;

    for (let i = highIndex - 1; i >= 0; i--) {
      if (!this.selectedIndexs[i]) {
        this.selectedIndexs[i] = true;
        lowIndex = i;
        break;
      }
    }

    if (
      this.getAveragePoint(leftTeamMembers) <=
      this.getAveragePoint(rightTeamMembers)
    ) {
      leftTeamMembers = leftTeamMembers.concat(members[highIndex]);
      rightTeamMembers = rightTeamMembers.concat(members[lowIndex]);
    } else {
      rightTeamMembers = rightTeamMembers.concat(members[highIndex]);
      leftTeamMembers = leftTeamMembers.concat(members[lowIndex]);
    }

    this.distributeMember(members, leftTeamMembers, rightTeamMembers);
  };

  getAveragePoint = team => {
    let point = 0;
    let index;
    for (index = 0; index < team.length; index++) {
      point += team[index].point;
    }
    return point / team.length;
  };

  addRandomMember = (selectedMembers, team) => {
    const min = Math.ceil(0);
    let max = Math.floor(10);
    let count = 0;

    while (count < 10) {
      let randomIndex = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

      if (this.selectedIndexs[randomIndex] === false) {
        team = team.concat(selectedMembers[randomIndex]);

        this.selectedIndexs = [
          ...this.selectedIndexs.slice(0, randomIndex),
          true,
          ...this.selectedIndexs.slice(randomIndex + 1),
        ];
        break;
      }
      count++;
    }

    return team;
  };

  /**
   * @see https://gmlwjd9405.github.io/2018/05/10/algorithm-quick-sort.html
   */
  quickSort = memberInfo => {
    if (memberInfo.length < 2) return memberInfo;

    const pivot = memberInfo[0].point;

    let leftCursor = 1;
    let rightCursor = memberInfo.length - 1;
    while (leftCursor <= rightCursor) {
      // 왼쪽수가 기준보다 크고 오른쪽 수가 기준보다 작으면 위치를 바꿉니다 (swap)
      if (
        memberInfo[leftCursor].point > pivot &&
        memberInfo[rightCursor].point < pivot
      ) {
        [memberInfo[leftCursor], memberInfo[rightCursor]] = [
          memberInfo[rightCursor],
          memberInfo[leftCursor],
        ];
        leftCursor++;
        rightCursor--;
      }

      // 왼쪽 수는 기준보다 작으면 다음으로 넘어가고, 크면 가만히 있습니다
      if (memberInfo[leftCursor].point <= pivot) {
        leftCursor++;
      }

      // 오른쪽 수는 기준보다 크면 다음으로 넘어가고, 작으면 가만히
      if (memberInfo[rightCursor].point >= pivot) {
        rightCursor--;
      }
    }

    [memberInfo[0], memberInfo[leftCursor - 1]] = [
      memberInfo[leftCursor - 1],
      memberInfo[0],
    ];
    const left = memberInfo.splice(0, leftCursor - 1);
    const mid = memberInfo.splice(0, 1);
    const right = memberInfo;

    return [...this.quickSort(left), ...mid, ...this.quickSort(right)];
  };

  render() {
    const {
      members,
      selectedMembers,
      searchKeyword,
      leftTeamMembers,
      rightTeamMembers,
      leftTeamPoint,
      rightTeamPoint,
    } = this.state;

    let defaultMemberInfo = [
      {
        nickname: `${this.state.searchKeyword}은(는) 클랜원 리스트에 없습니다.`,
        tier: '',
        position: '',
        key: '0',
        listType: '0',
      },
    ];

    let defaultSelectedMemberInfo = [
      {
        nickname: '',
        tier: '',
        position: '',
        key: '0',
        listType: '1',
      },
    ];

    //lowercase, blank 제거
    const filteredList = members.map(memberInfo =>
      memberInfo.nickname.toLowerCase().replace(/\s/g, ''),
    );

    //검색 결과 리스트
    const resultList = members.filter(
      memberInfo =>
        filteredList[members.indexOf(memberInfo)].indexOf(
          searchKeyword.toLowerCase().replace(/\s/g, ''),
        ) !== -1,
    );

    return (
      <div>
        <p>
          <input
            placeholder="소환사명 입력"
            onChange={this.handleChange}
            value={searchKeyword}
          />
          <button onClick={() => this.addUser(searchKeyword)}>추가</button>
        </p>
        <hr />
        <h2>대기 명단</h2>
        <MemberList
          members={resultList.length === 0 ? defaultMemberInfo : resultList}
          onUpdate={() => this.handleUpdate()}
          onClick={this.handleUserInfoClick}
          listType="0"
        />
        <h2>참여 명단 {selectedMembers.length}명</h2>
        <MemberList
          members={
            selectedMembers.length === 0
              ? defaultSelectedMemberInfo
              : selectedMembers
          }
          onUpdate={() => this.handleUpdate()}
          onClick={this.handleUserInfoClick}
          listType="1"
        />
        <button onClick={this.mixMember}>팀 매칭</button>
        <h2>왼쪽 팀</h2>
        {leftTeamPoint !== '' ? <p>{leftTeamPoint}</p> : null}
        <MemberList listType="2" members={leftTeamMembers} />
        <h2>오른쪽 팀</h2>
        {rightTeamPoint !== '' ? <p>{rightTeamPoint}</p> : null}
        <MemberList listType="2" members={rightTeamMembers} />
      </div>
    );
  }
}

export default App;
