import React, {Component} from 'react';
import MemberInfo from '../dto/MemberInfo'

class MemberList extends Component {
    static defaultProps ={
        members: [],
    }

    render() {
        const { members, onClick } = this.props;
        const list = members.map(
            memberInfo => (
                <MemberInfo
                    key = {memberInfo.userNumber}
                    memberInfo = {memberInfo}
                    onClick = {onClick}
                />
            )
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default MemberList;