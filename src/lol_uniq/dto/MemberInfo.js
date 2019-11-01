import React, {Component} from 'react';

class MemberInfo extends Component{
   static defaultProps = {
       // 기본값 설정
        memberInfo: { 
            nickname: 'Uniq R Jungler',
            tier: 'Challenger',
            position: 'Jungle',
            userNumber: '0'
        },
        listType: '0' // 0 : 대기 명단, 1 > 참여 명단
   }

   render() {
       const style = {
           border: '1px solid black',
           padding: '8px',
           margin: '8px'
       };

       const {
           nickname, tier, position, userNumber
       } = this.props.memberInfo;

       const {onClick} = this.props

       return(
            <div
                style = {style}
                onClick = {() => onClick(userNumber)}>
                <div><b>{nickname}</b></div>
                <div>{tier}</div>
                <div>{position}</div>
            </div>
       );
   }
}

export default MemberInfo;