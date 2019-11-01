import React, {Component} from 'react';
import MemberList from './lol_uniq/view/MemberList';
import axios from 'axios';

class App extends Component {
  state = {
    members: [
      {
        nickname: 'abc',
        tier: 'Challenger',
        position: 'Jungle',
        userNumber: '0'
      },
      {
        nickname: 'efg',
        tier: 'Iron',
        position: 'Support',
        userNumber: '1'
      }
    ],
    searchKeyword: '',
    selectedMembers: []
  }

  ApiInfo = {
    url : "https://kr.api.riotgames.com/lol",
    key : "RGAPI-7873ccd3-a7bd-4da3-97b5-468a4757cfa4"
  }

  handleChange = (e) => {
    this.setState({
      searchKeyword: e.target.value
    });
  }

  handleUpdate = (userNumber, data) => {
    const { members } = this.state
    this.setState({
      members: members.map(
        memberInfo => userNumber === memberInfo.userNumber
          ? { ...memberInfo, ...data}
          : memberInfo
      )
    })
  }

  getUserData = () => {
    let userUrl, matchUrl, leagueUrl;
  
    userUrl = `${this.ApiInfo.url}/summoner/v3/summoners/by-name/${this.state.searchKeyword}?api_key=${this.ApiInfo.key}`; 
  }

  handleClick = (userNumber) => {
    console.log('handleClick')

    const {members, selectedMembers} = this.state

    this.setState({
      selectedMembers: selectedMembers.concat(
        members.filter(
          memberInfo => memberInfo.userNumber === userNumber
        )
      ),

      members: members.filter(
        memberInfo => memberInfo.userNumber !== userNumber
      )
    })
  } 

  render() {
    const { members, selectedMembers, searchKeyword } = this.state

    let defaultMemberInfo = [{
      nickname: `${this.state.searchKeyword}은(는) 클랜원 리스트에 없습니다.`,
      tier: '',
      position: '',
      userNumber: '0',
    }]

    let defaultSelectedMemberInfo = [{
      nickname: '내전 멤버를 선택해주세요',
      tier: '',
      position: '',
      userNumber: '0',
    }]

    //lowercase, blank 제거
    const filteredList = members.map(
      memberInfo => memberInfo.nickname.toLowerCase().replace(/\s/g, "")
    )
    
    //검색 결과 리스트
    const resultList = members.filter(
      memberInfo =>
        filteredList[members.indexOf(memberInfo)].indexOf(searchKeyword.toLowerCase().replace(/\s/g, "")) !== -1
    )

    this.getUserData();

    return (
      <div>
        <p>
          <input
            placeholder="소환사명 검색"
            onChange={this.handleChange}
            value={searchKeyword}
          />
        </p>
        <hr/>
        <h2>대기 명단</h2>
        <MemberList
          members = {resultList.length === 0 ? defaultMemberInfo : resultList}
          onUpdate = {() => this.handleUpdate()}
          onClick = {this.handleClick}
        />

        <h2>참여 명단</h2>
        <MemberList
          members = {selectedMembers.length === 0 ? defaultSelectedMemberInfo : selectedMembers}
          onUpdate = {() => this.handleUpdate()}
          onClick = {this.handleClick}
        />
      </div>
    );
  }
}

export default App;
