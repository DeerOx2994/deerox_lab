import React, { Component } from 'react';
import MemberList from './lol_uniq/view/MemberList';
import DefaultMember from './lol_uniq/data/DefaultMember';
import TierGrade from './lol_uniq/data/TierGrade';
import TierInfo from './lol_uniq/dto/TierInfo';

class App extends Component {
  key = '10';
  state = {
    members: DefaultMember.members,
    searchKeyword: '',
    selectedMembers: [],
    leftTeamMembers: [],
    rightTeamMembers: [],
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

  handleUpdate = (userNumber, data) => {
    const { members } = this.state;
    this.setState({
      members: members.map(memberInfo =>
        userNumber === memberInfo.userNumber
          ? { ...memberInfo, ...data }
          : memberInfo,
      ),
    });
  };

  handleUserInfoClick = (userNumber, listType) => {
    console.log('handleUserInfoClick listType = ' + listType);

    const { members, selectedMembers } = this.state;

    listType === '0'
      ? this.setState({
          selectedMembers: selectedMembers.concat(
            members.filter(memberInfo => memberInfo.userNumber === userNumber),
          ),

          members: members.filter(
            memberInfo => memberInfo.userNumber !== userNumber,
          ),
        })
      : this.setState({
          members: members.concat(
            selectedMembers.filter(
              memberInfo => memberInfo.userNumber === userNumber,
            ),
          ),

          selectedMembers: selectedMembers.filter(
            memberInfo => memberInfo.userNumber !== userNumber,
          ),
        });
  };

  addUser = nickname => {
    console.log('addUser ' + nickname);

    const { members } = this.state;

    this.setState({
      members: members.concat({
        nickname: nickname,
        userNumber: this.key++,
      }),
    });
  };

  mixMember = () => {
    console.log('mixMember');
    let { selectedMembers, leftTeamMembers, rightTeamMembers } = this.state;

    if (selectedMembers.length !== 10) {
      return;
    }

    //1. 각 팀당 임의의 2명을 할당
    leftTeamMembers = this.addRandomMember(selectedMembers, leftTeamMembers);
    leftTeamMembers = this.addRandomMember(selectedMembers, leftTeamMembers);
    rightTeamMembers = this.addRandomMember(selectedMembers, rightTeamMembers);
    rightTeamMembers = this.addRandomMember(selectedMembers, rightTeamMembers);

    // 2. 각 팀의 평균 점수를 비교
    if (
      this.getAveragePoint(leftTeamMembers) <=
      this.getAveragePoint(rightTeamMembers)
    ) {
    } else {
    }
  };

  getAveragePoint = team => {
    let point = 0;
    let index;
    for (index = 0; index < team.length; index++) {
      point += this.getPoint(team[index].tier);
    }
    // console.log(`team.count is NaN ? ${isNaN(team.count)}`)
    return point / team.length;
  };

  addRandomMember = (selectedMembers, team) => {
    const min = Math.ceil(0);
    let max = Math.floor(10);
    let randomIndex = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

    let count = 0;
    while (count < 10) {
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

  getPoint = tierName => {
    console.log('getPoint : ' + tierName);
    const str = tierName.split(' ');
    const tier = TierGrade.find(function(e) {
      return e.tierName === str[0];
    });
    const number =
      str[1] === 'I' ? 0 : str[1] === 'II' ? 1 : str[1] === 'III' ? 2 : 3;
    return 1 * tier.tierPoint + tier.weight * number;
  };

  render() {
    const { members, selectedMembers, searchKeyword } = this.state;

    let defaultMemberInfo = [
      {
        nickname: `${this.state.searchKeyword}은(는) 클랜원 리스트에 없습니다.`,
        tier: '',
        position: '',
        userNumber: '0',
        listType: '0',
      },
    ];

    let defaultSelectedMemberInfo = [
      {
        nickname: '',
        tier: '',
        position: '',
        userNumber: '0',
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

        <h2>참여 명단</h2>
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

        <MemberList listType="1" />

        <MemberList listType="1" />
      </div>
    );
  }
}

export default App;
