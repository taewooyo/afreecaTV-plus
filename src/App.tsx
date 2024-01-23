import React, { useRef, useState } from "react";
import Nickname from "./components/Nickname";
import Toggle from "./components/Toggle";
import { User } from "./model/User";
import Id from "./Id";
import { ToggleData } from "@/src/model/ToggleData";
import { ChatCollectorData } from "@/src/model/ChatCollectorData";

export default function App(props: {
  nicks: User[];
  ids: User[];
  toggle: ToggleData;
  collector: ChatCollectorData;
}) {
  const [nicks, setNicks] = useState(props.nicks);
  const [ids, setIds] = useState(props.ids);
  const [toggle, setToggle] = useState(props.toggle);
  const [collector, setCollector] = useState(props.collector);
  const nickInput = useRef<HTMLInputElement>(null);
  const idInput = useRef<HTMLInputElement>(null);

  const addNickBtnClick = () => {
    if (!nickInput.current || !nickInput.current.value) return;
    const nicknames = nicks.map((user) => user.user);
    if (nicknames.includes(nickInput.current?.value)) return;

    // if (nicks.includes(nickInput.current.value)) return;
    const newNicks = [...nicknames, nickInput.current.value].map(
      (nickname) => ({ isNickname: true, user: nickname })
    );
    chrome.storage.local.set({ nicks: newNicks }, () => {
      setNicks(newNicks);
      if (nickInput.current == null) return;
      nickInput.current.value = "";
    });
  };

  const addNickEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!nickInput.current || !nickInput.current.value) return;
      const nicknames = nicks.map((user) => user.user);
      if (nicknames.includes(nickInput.current?.value)) return;

      // const newNicks = [...nicks, nickInput.current.value];
      const newNicks = [...nicknames, nickInput.current.value].map(
        (nickname) => ({ isNickname: true, user: nickname })
      );
      chrome.storage.local.set({ nicks: newNicks }, () => {
        setNicks(newNicks);
        if (nickInput.current == null) return;
        nickInput.current.value = "";
      });
    }
  };

  const addIdBtnClick = () => {
    if (!idInput.current || !idInput.current.value) return;
    const userIds = ids.map((user) => user.user);
    if (userIds.includes(idInput.current?.value)) return;

    // if (nicks.includes(nickInput.current.value)) return;
    const newIds = [...userIds, idInput.current.value].map((id) => ({
      isNickname: false,
      user: id,
    }));
    chrome.storage.local.set({ ids: newIds }, () => {
      setIds(newIds);
      if (idInput.current == null) return;
      idInput.current.value = "";
    });
  };

  const addIdEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!idInput.current || !idInput.current.value) return;
      const userIds = ids.map((user) => user.user);
      if (userIds.includes(idInput.current?.value)) return;

      // const newNicks = [...nicks, nickInput.current.value];
      const newIds = [...userIds, idInput.current.value].map((id) => ({
        isNickname: false,
        user: id,
      }));
      chrome.storage.local.set({ ids: newIds }, () => {
        setIds(newIds);
        if (idInput.current == null) return;
        idInput.current.value = "";
      });
    }
  };

  const nicknameClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newNicks = nicks.filter(
      (item) => item.user !== e.currentTarget.innerHTML
    );
    chrome.storage.local.set({ nicks: newNicks }, () => {
      setNicks(newNicks);
    });
  };

  const idClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newIds = ids.filter(
      (item) => item.user !== e.currentTarget.innerHTML
    );
    chrome.storage.local.set({ ids: newIds }, () => {
      setIds(newIds);
    });
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

  return (
    <div
      className="wrapper"
      style={{
        width: "360px",
        height: "500px",
        overflow: "scroll",
        textAlign: "center",
        backgroundColor: "#0a3eb1",
        color: "white",
      }}
    >
      <header
        className="header"
        style={{
          padding: "20px 20px",
          fontSize: "1.5rem",
        }}
      >
        <span>아프리카티비 플러스</span>
      </header>
      <div>
        <ul>
          <Toggle
            onChange={() => changeCollector()}
            label="채팅 콜렉터"
            value={collector.isUse}
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
        <input
          ref={nickInput}
          id="nickname-input"
          type="text"
          placeholder="닉네임을 입력하세요"
          onKeyUp={addNickEnterClick}
          style={{
            width: "250px",
            marginBottom: "5px",
          }}
        />
        <br />
        <button
          onClick={addNickBtnClick}
          id="add-btn"
          style={{
            border: "0",
            marginLeft: "5px",
            marginBottom: "5px",
            backgroundColor: "#c23d86",
            color: "white",
            borderRadius: "8px",
          }}
        >
          닉네임 추가하기
        </button>
        <input
          ref={idInput}
          id="id-input"
          type="text"
          placeholder="아이디를 입력하세요"
          onKeyUp={addIdEnterClick}
          style={{
            width: "250px",
            marginBottom: "5px",
          }}
        />
        <br />
        <button
          onClick={addIdBtnClick}
          id="add-btn"
          style={{
            border: "0",
            marginLeft: "5px",
            marginBottom: "5px",
            backgroundColor: "#c23d86",
            color: "white",
            borderRadius: "8px",
          }}
        >
          아이디 추가하기
        </button>
        <div className="nickname-container">
          <div className="nicknames">
            <Nickname nick={nicks} onClick={nicknameClick}>
              <div>필터링에서 제거하고 싶으면</div>
              <div>닉네임 및 아이디를 클릭하시면 됩니다.</div>
            </Nickname>
          </div>
          <div className="nicknames">
            <Id userId={ids} onClick={idClick}></Id>
          </div>
        </div>
      </div>
    </div>
  );
}
