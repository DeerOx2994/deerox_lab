import React, { Component } from 'react';
import MemberInfo from '../dto/MemberInfo';

class MemberList extends Component {
  static defaultProps = {
    members: [],
    listType: '0', // 0 : 대기 명단, 1 : 참여 명단
  };

  render() {
    const { members, onClick, listType } = this.props;

    const list = members.map(memberInfo => (
      <MemberInfo
        key={memberInfo.key}
        memberInfo={memberInfo}
        onClick={onClick}
        listType={listType}
      />
    ));

    return <div>{list}</div>;
  }
}

export default MemberList;
