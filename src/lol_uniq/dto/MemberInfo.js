import React, { Component } from 'react';
import axios from 'axios';
import TierGrade from '../data/TierGrade';

class MemberInfo extends Component {
  static defaultProps = {
    // 기본값 설정
    memberInfo: {
      nickname: '',
      tier: '',
      position: '',
      key: '',
      summoner: '',
      match: '',
      isSelected: 'false',
      point: '0',
    },
  };

  isUpdated = false;

  getUserData = async function(instance, nickname, key) {
    if (nickname !== undefined && nickname !== '') {
      console.log(nickname + '/' + this.isUpdated);
      if (this.isUpdated) {
        return;
      }

      this.isUpdated = true;

      try {
        const summonerData = await instance.get(
          `/summoner/v4/summoners/by-name/${nickname}?api_key=${key}`,
        );
        const matchData = await instance.get(
          `/match/v4/matchlists/by-account/${summonerData.data.accountId}?api_key=${key}`,
        );
        const leagueData = await instance.get(
          `/league/v4/entries/by-summoner/${summonerData.data.id}?api_key=${key}`,
        );
        this.props.memberInfo.summoner = summonerData.data;
        this.props.memberInfo.match = matchData.data;

        this.props.memberInfo.nickname = summonerData.data.name;
        this.props.memberInfo.tier =
          leagueData.data.find(e => {
            return e.queueType === 'RANKED_SOLO_5x5';
          }) === undefined
            ? 'UNRANKED'
            : leagueData.data.find(e => {
                return e.queueType === 'RANKED_SOLO_5x5';
              }).tier +
              ' ' +
              leagueData.data.find(e => {
                return e.queueType === 'RANKED_SOLO_5x5';
              }).rank;

        this.props.memberInfo.point = this.getPoint(this.props.memberInfo.tier);

        this.setState({});
        console.log(summonerData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  getPoint = tierName => {
    const str = tierName.split(' ');
    const tier = TierGrade.find(function(e) {
      return e.tierName === str[0];
    });
    const number =
      str[1] === 'I' ? 0 : str[1] === 'II' ? 1 : str[1] === 'III' ? 2 : 3;
    return 1 * tier.tierPoint + tier.weight * number;
  };

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px',
    };

    const { tier, position, key, summoner, match } = this.props.memberInfo;

    const { listType } = this.props;
    const { onClick } = this.props;

    if (listType === '1' && this.isUpdated === false) {
      const ApiInfo = {
        url: '/lol',
        key: 'RGAPI-87666eee-0ab1-48bd-a5fb-9e4d1f1ffdcf',
      };
      ApiInfo.instance = axios.create({ baseURL: ApiInfo.url });

      this.getUserData(
        ApiInfo.instance,
        this.props.memberInfo.nickname,
        ApiInfo.key,
      );
    }

    const { nickname } = this.props.memberInfo;

    return (
      <div style={style} onClick={() => onClick(key, listType)}>
        <div>
          <b>
            {listType === '1' && nickname === ''
              ? '참여 멤버를 추가해주세요'
              : nickname}
          </b>
        </div>
        {listType !== '0' ? <div>{tier}</div> : null}
        {listType !== '0' ? <div>{position}</div> : null}
      </div>
    );
  }
}

export default MemberInfo;
