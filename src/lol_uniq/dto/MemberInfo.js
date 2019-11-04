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
        }
   }

    getUserData = async function(instance, nickname, key) {
        if(nickname !== '') {
            console.log('getUserData')

            try {
                const summonerData = await instance.get(`/summoner/v4/summoners/by-name/${nickname}?api_key=${key}`);
                const matchData = await instance.get(`/match/v4/matchlists/by-account/${summonerData.data.accountId}?api_key=${key}`);
                this.props.memberInfo.summoner = summonerData.data;
                this.props.memberInfo.match = matchData.data;
            } catch (error) {
                console.error(error)
            }
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
            const ApiInfo = {
                url : "/lol",
                key : "RGAPI-87666eee-0ab1-48bd-a5fb-9e4d1f1ffdcf"
            }
            ApiInfo.instance = axios.create({ baseURL : ApiInfo.url });

            this.getUserData(ApiInfo.instance, nickname, ApiInfo.key);
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