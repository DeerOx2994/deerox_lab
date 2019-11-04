import React, {Component} from 'react';
import MemberList from './lol_uniq/view/MemberList';

class App extends Component {
  state = {
    members: [
      {
        nickname: 'UniqRJungler',
        tier: 'Challenger',
        position: 'Jungle',
        userNumber: '0',
        summoner: '',
        match: ''
      },
      {
        nickname: 'UniqRNoChat',
        tier: 'Iron',
        position: 'Support',
        userNumber: '1',
        summoner: '',
        match: '',
      }
    ],
    searchKeyword: '',
    selectedMembers: []
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

  handleClick = (userNumber, listType) => {
    console.log('handleClick listType = ' + listType)

    const {members, selectedMembers} = this.state

    listType === '0' ?
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
      : this.setState({
        members: members.concat(
          selectedMembers.filter(
            memberInfo => memberInfo.userNumber === userNumber
          )
        ),
  
        selectedMembers: selectedMembers.filter(
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
      listType: '0'
    }]

    let defaultSelectedMemberInfo = [{
      nickname: '',
      tier: '',
      position: '',
      userNumber: '0',
      listType: '1'
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
          listType = '0'
        />

        <h2>참여 명단</h2>
        <MemberList
          members = {selectedMembers.length === 0 ? defaultSelectedMemberInfo : selectedMembers}
          onUpdate = {() => this.handleUpdate()}
          onClick = {this.handleClick}
          listType = '1'
        />
      </div>
    );
  }
}

export default App;
