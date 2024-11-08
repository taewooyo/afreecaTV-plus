import React, { useRef, useState } from "react";
import Toggle from "./components/Toggle";
import { User } from "./model/User";
import { ToggleData } from "@/src/model/ToggleData";
import { ChatCollectorData } from "@/src/model/ChatCollectorData";
import { ChatSetting } from "@/src/model/ChatSetting";
import { ChatTwoLine } from "@/src/model/ChatTwoLine";
import { FanBadge } from "@/src/model/FanBadge";
import { SubscribeBadge } from "@/src/model/SubscribeBadge";
import { SupportBadge } from "@/src/model/SupportBadge";
import { TopfanBadge } from "@/src/model/TopfanBadge";
import { Divider } from "@/src/model/Divider";
import { Highlight } from "@/src/model/Highlight";
import Header from "./components/Header";
import ButtonGroup from "./components/ButtonGroup";
import InputForm from "./components/InputForm";
import FilterList from "./components/FilterList";

export default function App(props: {
  nicks: User[];
  ids: User[];
  toggle: ToggleData;
  collector: ChatCollectorData;
  // favoriteChannel: FavoriteChannelData[],
  chatSetting: ChatSetting;
  chatTwoLine: ChatTwoLine;
  fanBadge: FanBadge;
  subscribeBadge: SubscribeBadge;
  supportBadge: SupportBadge;
  topfanBadge: TopfanBadge;
  divider: Divider;
  highlight: Highlight;
}) {
  const [nicks, setNicks] = useState(props.nicks);
  const [ids, setIds] = useState(props.ids);
  const [toggle, setToggle] = useState(props.toggle);
  const [collector, setCollector] = useState(props.collector);
  // const [favoriteChannels, setFavoriteChannels] = useState(props.favoriteChannel)
  const [chatSetting, setChatSetting] = useState(props.chatSetting);
  const [chatTwoLine, setChatTwoLine] = useState(props.chatTwoLine);
  const [fanBadge, setFanBadge] = useState(props.fanBadge);
  const [subscribeBadge, setSubscribeBadage] = useState(props.subscribeBadge);
  const [supportBadge, setSupportBadge] = useState(props.supportBadge);
  const [topFanBadge, setTopFanBadge] = useState(props.topfanBadge);
  const [divider, setDivider] = useState(props.divider);
  const [highlight, setHighlight] = useState(props.highlight);

  const handleAddNick = (nickname: string, resetInput: () => void) => {
    const nicknames = nicks.map((user) => user.user);
    // 방어 코드: 닉네임이 비었거나 중복일 경우 처리
    if (!nickname.trim() || nicknames.includes(nickname)) {
      return;
    }

    const newNicks = [...nicks, { isNickname: true, user: nickname }];
    chrome.storage.local.set({ nicks: newNicks }, () => {
      setNicks(newNicks);
      resetInput();
    });
  };

  const handleAddId = (id: string, resetInput: () => void) => {
    const userIds = ids.map((user) => user.user);
    if (!id.trim() || userIds.includes(id)) {
      return;
    }

    const newIds = [...ids, { isNickname: false, user: id }];
    chrome.storage.local.set({ ids: newIds }, () => {
      setIds(newIds);
      resetInput(); // 성공 시 입력 필드 초기화
    });
  };

  const handleNickClick = (nickname: string) => {
    const newNicks = nicks.filter((user) => user.user !== nickname);
    chrome.storage.local.set({ nicks: newNicks }, () => setNicks(newNicks));
  };

  const handleIdClick = (id: string) => {
    const newIds = ids.filter((user) => user.user !== id);
    chrome.storage.local.set({ ids: newIds }, () => setIds(newIds));
  };

  const changeToggle = (text: string) => {
    let newToggleData = {
      streamer: toggle.streamer,
      manager: toggle.manager,
      topfan: toggle.topfan,
      gudok: toggle.gudok,
      fan: toggle.fan,
      user: toggle.user,
    };
    if (text == "streamer") {
      newToggleData.streamer = !newToggleData.streamer;
    } else if (text == "manager") {
      newToggleData.manager = !newToggleData.manager;
    } else if (text == "topfan") {
      newToggleData.topfan = !newToggleData.topfan;
    } else if (text == "gudok") {
      newToggleData.gudok = !newToggleData.gudok;
    } else if (text == "fan") {
      newToggleData.fan = !newToggleData.fan;
    } else if (text == "user") {
      newToggleData.user = !newToggleData.user;
    }
    chrome.storage.local.set({ toggle: newToggleData }, () => {
      setToggle(newToggleData);
    });
  };

  const changeCollector = () => {
    let newChatCollector = { isUse: !collector.isUse };
    chrome.storage.local.set({ collector: newChatCollector }, () => {
      setCollector(newChatCollector);
    });
  };

  const changeChatSetting = () => {
    let newChatSetting = { isUse: !chatSetting.isUse };
    chrome.storage.local.set({ chatSetting: newChatSetting }, () => {
      setChatSetting(newChatSetting);
      if (chatTwoLine.isUse) changeChatTwoLine();
    });
  };

  const changeChatTwoLine = () => {
    let newChatTwoLine = { isUse: !chatTwoLine.isUse };
    chrome.storage.local.set({ chatTwoLine: newChatTwoLine }, () => {
      setChatTwoLine(newChatTwoLine);
      if (chatSetting.isUse) changeChatSetting();
    });
  };

  const changeSubscribeBadge = () => {
    let newSubscribeBadge = { isUse: !subscribeBadge.isUse };
    chrome.storage.local.set({ subscribeBadge: newSubscribeBadge }, () => {
      setSubscribeBadage(newSubscribeBadge);
    });
  };

  const changeTopFanBadge = () => {
    let newTopFanBadge = { isUse: !topFanBadge.isUse };
    chrome.storage.local.set({ topFanBadge: newTopFanBadge }, () => {
      setTopFanBadge(newTopFanBadge);
    });
  };

  const changeFanBadge = () => {
    let newFanBadge = { isUse: !fanBadge.isUse };
    chrome.storage.local.set({ fanBadge: newFanBadge }, () => {
      setFanBadge(newFanBadge);
    });
  };

  const changeSupportBadge = () => {
    let newSupportBadge = { isUse: !supportBadge.isUse };
    chrome.storage.local.set({ supportBadge: newSupportBadge }, () => {
      setSupportBadge(newSupportBadge);
    });
  };

  const changeDivider = () => {
    let newDivider = { isUse: !divider.isUse };
    chrome.storage.local.set({ divider: newDivider }, () => {
      setDivider(newDivider);
    });
  };

  const changeHighlight = () => {
    let newHighlight = { isUse: !highlight.isUse };
    chrome.storage.local.set({ highlight: newHighlight }, () => {
      setHighlight(newHighlight);
    });
  };

  return (
    <div
      className="wrapper"
      style={{
        textAlign: "center",
        color: "white",
        padding: "2rem",
        minWidth: "530px",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <div
        style={{
          margin: "0 auto",
        }}
      >
        <Header />
        <ButtonGroup />
        <div>
          <ul>
            <Toggle
              onChange={() => changeDivider()}
              label="채팅 구분자"
              value={divider.isUse}
            />
            <Toggle
              onChange={() => changeChatSetting()}
              label="채팅 시작 정렬"
              value={chatSetting.isUse}
            />
            <Toggle
              onChange={() => changeChatTwoLine()}
              label="채팅 두줄 보기"
              value={chatTwoLine.isUse}
            />
            <Toggle
              onChange={() => changeSubscribeBadge()}
              label="구독 뱃지 제거"
              value={subscribeBadge.isUse}
            />
            <Toggle
              onChange={() => changeTopFanBadge()}
              label="열혈팬 뱃지 제거"
              value={topFanBadge.isUse}
            />
            <Toggle
              onChange={() => changeFanBadge()}
              label="팬클럽 뱃지 제거"
              value={fanBadge.isUse}
            />
            <Toggle
              onChange={() => changeSupportBadge()}
              label="서포터 뱃지 제거"
              value={supportBadge.isUse}
            />
            <Toggle
              onChange={() => changeCollector()}
              label="채팅 콜렉터"
              value={collector.isUse}
            />
            <Toggle
              onChange={() => changeHighlight()}
              label="콜렉터 채팅 하이라이트 처리"
              value={highlight.isUse}
            />
            <Toggle
              onChange={() => changeToggle("streamer")}
              label="BJ"
              value={toggle.streamer}
            />
            <Toggle
              onChange={() => changeToggle("manager")}
              label="매니저"
              value={toggle.manager}
            />
            <Toggle
              onChange={() => changeToggle("topfan")}
              label="열혈팬"
              value={toggle.topfan}
            />
            <Toggle
              onChange={() => changeToggle("gudok")}
              label="구독팬"
              value={toggle.gudok}
            />
            <Toggle
              onChange={() => changeToggle("fan")}
              label="팬클럽"
              value={toggle.fan}
            />
            <Toggle
              onChange={() => changeToggle("user")}
              label="일반유저"
              value={toggle.user}
            />
          </ul>
          <InputForm placeholder="닉네임을 입력하세요" onAdd={handleAddNick} />
          <InputForm placeholder="아이디를 입력하세요" onAdd={handleAddId} />
          <div className="nickname-container">
            <FilterList
              nicks={nicks}
              ids={ids}
              onNickClick={handleNickClick}
              onIdClick={handleIdClick}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "10px",
        }}
      >
        {/*{favoriteChannels.length > 0 ? (*/}
        {/*    <Channel*/}
        {/*        channels={favoriteChannels}*/}
        {/*        onClick={(e, url) => onClickChannel(e, url)}*/}
        {/*    />*/}
        {/*) : (*/}
        {/*    <button*/}
        {/*        onClick={onClickLogin}*/}
        {/*        style={{*/}
        {/*            marginLeft: "5px",*/}
        {/*            color: "#000",*/}
        {/*            background: "linear-gradient(#C6F40AFF, #EDE80CFF)",*/}
        {/*            borderRadius: "15px",*/}
        {/*            border: "none",*/}
        {/*            padding: "0.5rem 1rem",*/}
        {/*            fontSize: ".875rem",*/}
        {/*            fontWeight: "700",*/}
        {/*            textDecoration: "auto",*/}
        {/*            cursor: "pointer"*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        실시간으로 변경되는 즐겨찾기 리스트를 보기 위해서 로그인이 필요합니다.*/}
        {/*    </button>*/}
        {/*)}*/}
      </div>
    </div>
  );
}
