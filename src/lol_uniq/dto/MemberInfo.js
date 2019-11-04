import React, {Component} from 'react';
import axios from 'axios';

class MemberInfo extends Component{
   static defaultProps = {
       // 기본값 설정
        memberInfo: { 
            nickname: '',
            tier: '',
            position: '',
            userNumber: '',
            summoner: '',
            match: ''
        },
   }

   ApiInfo = {
    key : "RGAPI-87666eee-0ab1-48bd-a5fb-9e4d1f1ffdcf"
  }

   getUserData = (nickname) => {
       if(nickname !== '') {
        console.log('getUserData')
        let userUrl, matchUrl;
        
        userUrl = `/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${this.ApiInfo.key}`;
        axios.get(userUrl).then(summonerData => {
            matchUrl = `/lol/match/v4/matchlists/by-account/${summonerData.data.accountId}?api_key=${this.ApiInfo.key}`;
            axios.get(matchUrl).then(matchData => {
                this.setState({
                    summoner: summonerData.data,
                    match: matchData.data,
                })
            }).catch(error => console.log('Riot API error 1'));
        }).catch(error => console.log('Riot API error 0'));
    }
  }

   render() {
       const style = {
           border: '1px solid black',
           padding: '8px',
           margin: '8px'
       };

       const {
           nickname, tier, position, userNumber, summoner, match
       } = this.props.memberInfo;

       const {listType} = this.props;
       const {onClick} = this.props;

       if(listType === '1') {
           this.getUserData(nickname);
       }

       return(
            <div
                style = {style}
                onClick = {() => onClick(userNumber, listType)}>
                <div><b>{
                    listType === '1' && nickname === ''
                    ? '참여 멤버를 추가해주세요'
                    : nickname
                }</b></div>
                <div>{tier}</div>
                <div>{position}</div>
            </div>
       );
   }
}

export default MemberInfo;