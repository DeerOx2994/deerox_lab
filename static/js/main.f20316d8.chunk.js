(this.webpackJsonpdeerox_lab=this.webpackJsonpdeerox_lab||[]).push([[0],{22:function(e,t,n){e.exports=n(46)},27:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(18),o=n.n(i),c=(n(27),n(7)),s=n(19),m=n(2),l=n(3),u=n(5),p=n(4),d=n(6),h=n(8),f=n.n(h),b=n(20),k=n(21),y=n.n(k),g=[{tierName:"IRON",tierPoint:100,weight:50},{tierName:"BRONZE",tierPoint:300,weight:50},{tierName:"SILVER",tierPoint:500,weight:50},{tierName:"GOLD",tierPoint:700,weight:60},{tierName:"PLATINUM",tierPoint:1e3,weight:100},{tierName:"DIAMOND",tierPoint:1500,weight:100},{tierName:"MASTER",tierPoint:2e3,weight:100},{tierName:"GRANDMASTER",tierPoint:2500,weight:100},{tierName:"CHALLENGER",tierPoint:3e3,weight:100}],v=function(e){function t(){var e,n;Object(m.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(a)))).isUpdated=!1,n.getUserData=function(){var e=Object(b.a)(f.a.mark((function e(t,n,r){var a,i,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===n||""===n){e.next=27;break}if(console.log(n+"/"+this.isUpdated),!this.isUpdated){e.next=4;break}return e.abrupt("return");case 4:return this.isUpdated=!0,e.prev=5,e.next=8,t.get("/summoner/v4/summoners/by-name/".concat(n,"?api_key=").concat(r));case 8:return a=e.sent,e.next=11,t.get("/match/v4/matchlists/by-account/".concat(a.data.accountId,"?api_key=").concat(r));case 11:return i=e.sent,e.next=14,t.get("/league/v4/entries/by-summoner/".concat(a.data.id,"?api_key=").concat(r));case 14:o=e.sent,this.props.memberInfo.summoner=a.data,this.props.memberInfo.match=i.data,this.props.memberInfo.nickname=a.data.name,this.props.memberInfo.tier=void 0===o.data.find((function(e){return"RANKED_SOLO_5x5"===e.queueType}))?"UNRANKED":o.data.find((function(e){return"RANKED_SOLO_5x5"===e.queueType})).tier+" "+o.data.find((function(e){return"RANKED_SOLO_5x5"===e.queueType})).rank,this.props.memberInfo.point=this.getPoint(this.props.memberInfo.tier),this.setState({}),console.log(a),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(5),console.error(e.t0);case 27:case"end":return e.stop()}}),e,this,[[5,24]])})));return function(t,n,r){return e.apply(this,arguments)}}(),n.getPoint=function(e){var t=e.split(" "),n=g.find((function(e){return e.tierName===t[0]})),r="I"===t[1]?0:"II"===t[1]?1:"III"===t[1]?2:3;return 1*n.tierPoint+n.weight*r},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.memberInfo,t=e.tier,n=e.position,r=e.key,i=(e.summoner,e.match,this.props.listType),o=this.props.onClick;if("1"===i&&!1===this.isUpdated){var c={url:"/lol",key:"RGAPI-87666eee-0ab1-48bd-a5fb-9e4d1f1ffdcf"};c.instance=y.a.create({baseURL:c.url}),this.getUserData(c.instance,this.props.memberInfo.nickname,c.key)}var s=this.props.memberInfo.nickname;return a.a.createElement("div",{style:{border:"1px solid black",padding:"8px",margin:"8px"},onClick:function(){return o(r,i)}},a.a.createElement("div",null,a.a.createElement("b",null,"1"===i&&""===s?"\ucc38\uc5ec \uba64\ubc84\ub97c \ucd94\uac00\ud574\uc8fc\uc138\uc694":s)),"0"!==i?a.a.createElement("div",null,t):null,"0"!==i?a.a.createElement("div",null,n):null)}}]),t}(r.Component);v.defaultProps={memberInfo:{nickname:"",tier:"",position:"",key:"",summoner:"",match:"",isSelected:"false",point:"0"}};var O=v,I=function(e){function t(){return Object(m.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.members,n=e.onClick,r=e.listType,i=t.map((function(e){return a.a.createElement(O,{key:e.key,memberInfo:e,onClick:n,listType:r})}));return a.a.createElement("div",null,i)}}]),t}(r.Component);I.defaultProps={members:[],listType:"0"};var E=I,w=function e(){Object(m.a)(this,e)};w.members=[{nickname:"Uniq R Jungler",tier:"",position:"",key:"0",summoner:"",match:""},{nickname:"Uniq R \uc5f0\ud76c",tier:"",position:"",key:"1",summoner:"",match:""},{nickname:"Uniq R Younggak",tier:"",position:"",key:"2",summoner:"",match:""},{nickname:"Uniq R \ucc9c\uc7ac\ubbf8\ub4dc",tier:"",position:"",key:"3",summoner:"",match:""},{nickname:"Uniq R \ud55c\ub77c\ubd09",tier:"",position:"",key:"4",summoner:"",match:""},{nickname:"Uniq R J",tier:"",position:"",key:"5",summoner:"",match:""},{nickname:"Uniq R \ub85c\uc774\ub4dc",tier:"",position:"",key:"6",summoner:"",match:""},{nickname:"Uniq R \uae38\ub3d9",tier:"",position:"",key:"7",summoner:"",match:""},{nickname:"Uniq R Give",tier:"",position:"",key:"8",summoner:"",match:""},{nickname:"Uniq R NoChat",tier:"",position:"",key:"9",summoner:"",match:""}];var P=w;function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var M=function(e){function t(){var e,n;Object(m.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(a)))).key="10",n.state={members:P.members,searchKeyword:"",selectedMembers:[],leftTeamMembers:[],rightTeamMembers:[],leftTeamPoint:"",rightTeamPoint:""},n.selectedIndexs=[],n.handleChange=function(e){n.setState({searchKeyword:e.target.value})},n.handleUpdate=function(e,t){var r=n.state.members;n.setState({members:r.map((function(n){return e===n.key?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{},t):n}))})},n.handleUserInfoClick=function(e,t){console.log("handleUserInfoClick listType = "+t);var r=n.state,a=r.members,i=r.selectedMembers;"0"===t?n.setState({selectedMembers:i.concat(a.filter((function(t){return t.key===e}))),members:a.filter((function(t){return t.key!==e}))}):n.setState({members:a.concat(i.filter((function(t){return t.key===e}))),selectedMembers:i.filter((function(t){return t.key!==e}))})},n.addUser=function(e){console.log("addUser "+e);var t=n.state.members;n.setState({members:t.concat({nickname:e,key:n.key++})})},n.mixMember=function(){console.log("mixMember");var e=n.state.selectedMembers;if(10===e.length){var t=[],r=[];n.selectedIndexs=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];var a=e.map((function(e){return e}));e=n.quickSort(e),t=n.addRandomMember(e,t),t=n.addRandomMember(e,t),r=n.addRandomMember(e,r),r=n.addRandomMember(e,r),n.distributeMember(e,a,t,r)}},n.distributeMember=function(e,t,r,a){if(r.length>=5&&a.length>=5){for(var i=0,o=0,c=0;c<5;c++)i+=r[c].point,o+=a[c].point;n.setState({selectedMembers:t,leftTeamMembers:r,rightTeamMembers:a,leftTeamPoint:i/5,rightTeamPoint:o/5})}else{for(var s=e.length-1,m=s;m>=0;m--)if(!n.selectedIndexs[m]){n.selectedIndexs[m]=!0,s=m;break}for(var l=s-1,u=s-1;u>=0;u--)if(!n.selectedIndexs[u]){n.selectedIndexs[u]=!0,l=u;break}n.getAveragePoint(r)<=n.getAveragePoint(a)?(r=r.concat(e[s]),a=a.concat(e[l])):(a=a.concat(e[s]),r=r.concat(e[l])),n.distributeMember(e,t,r,a)}},n.getAveragePoint=function(e){var t,n=0;for(t=0;t<e.length;t++)n+=e[t].point;return n/e.length},n.addRandomMember=function(e,t){for(var r=Math.ceil(0),a=Math.floor(10),i=0;i<10;){var o=Math.floor(Math.random()*(a-r))+r;if(!1===n.selectedIndexs[o]){t=t.concat(e[o]),n.selectedIndexs=[].concat(Object(c.a)(n.selectedIndexs.slice(0,o)),[!0],Object(c.a)(n.selectedIndexs.slice(o+1)));break}i++}return t},n.quickSort=function(e){if(e.length<2)return e;for(var t=e[0].point,r=1,a=e.length-1;r<=a;){if(e[r].point>t&&e[a].point<t){var i=[e[a],e[r]];e[r]=i[0],e[a]=i[1],r++,a--}e[r].point<=t&&r++,e[a].point>=t&&a--}var o=[e[r-1],e[0]];e[0]=o[0],e[r-1]=o[1];var s=e.splice(0,r-1),m=e.splice(0,1),l=e;return[].concat(Object(c.a)(n.quickSort(s)),Object(c.a)(m),Object(c.a)(n.quickSort(l)))},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.members,r=t.selectedMembers,i=t.searchKeyword,o=t.leftTeamMembers,c=t.rightTeamMembers,s=t.leftTeamPoint,m=t.rightTeamPoint,l=[{nickname:"".concat(this.state.searchKeyword,"\uc740(\ub294) \ud074\ub79c\uc6d0 \ub9ac\uc2a4\ud2b8\uc5d0 \uc5c6\uc2b5\ub2c8\ub2e4."),tier:"",position:"",key:"0",listType:"0"}],u=n.map((function(e){return e.nickname.toLowerCase().replace(/\s/g,"")})),p=n.filter((function(e){return-1!==u[n.indexOf(e)].indexOf(i.toLowerCase().replace(/\s/g,""))}));return a.a.createElement("div",null,a.a.createElement("p",null,a.a.createElement("input",{placeholder:"\uc18c\ud658\uc0ac\uba85 \uc785\ub825",onChange:this.handleChange,value:i}),a.a.createElement("button",{onClick:function(){return e.addUser(i)}},"\ucd94\uac00")),a.a.createElement("hr",null),a.a.createElement("h2",null,"\ub300\uae30 \uba85\ub2e8"),a.a.createElement(E,{members:0===p.length?l:p,onUpdate:function(){return e.handleUpdate()},onClick:this.handleUserInfoClick,listType:"0"}),a.a.createElement("h2",null,"\ucc38\uc5ec \uba85\ub2e8 ",r.length,"\uba85"),a.a.createElement(E,{members:0===r.length?[{nickname:"",tier:"",position:"",key:"0",listType:"1"}]:r,onUpdate:function(){return e.handleUpdate()},onClick:this.handleUserInfoClick,listType:"1"}),a.a.createElement("button",{onClick:this.mixMember},"\ud300 \ub9e4\uce6d"),a.a.createElement("h2",null,"\uc67c\ucabd \ud300"),""!==s?a.a.createElement("p",null,s):null,a.a.createElement(E,{listType:"2",members:o}),a.a.createElement("h2",null,"\uc624\ub978\ucabd \ud300"),""!==m?a.a.createElement("p",null,m):null,a.a.createElement(E,{listType:"2",members:c}))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[22,1,2]]]);
//# sourceMappingURL=main.f20316d8.chunk.js.map