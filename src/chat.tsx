import "./chat.css";
import { User } from "@/src/model/User";
import { ToggleData } from "@/src/model/ToggleData";
import { ChatCollectorData } from "@/src/model/ChatCollectorData";
import { getCollector } from "./getStorageData";

const config = { childList: true, subtree: true };
let nicks: User[] = [];
let ids: User[] = [];
let toggle: ToggleData;
let chatCollector: ChatCollectorData;
let previousData: number | null;
let collectorChangeFlag = false;

async function updateNickname() {
  chrome.storage.local.get("nicks").then((res: { [p: string]: User[] }) => {
    if (res.nicks) {
      nicks = res.nicks;
    } else {
      nicks = [];
    }
  });
}

async function updateId() {
  chrome.storage.local.get("ids").then((res: { [p: string]: User[] }) => {
    if (res.ids) {
      ids = res.ids;
    } else {
      ids = [];
    }
  });
}

function updateToggle() {
  chrome.storage.local.get("toggle").then((res) => {
    if (res.toggle) {
      toggle = res.toggle;
    } else {
      toggle = {
        streamer: false,
        manager: false,
        topfan: false,
        gudok: false,
        fan: false,
        user: false,
      };
    }
  });
}

async function updateCollector() {
  const res = await chrome.storage.local.get("collector");
  if (res.collector) {
    chatCollector = res.collector;
    const chatBox = document.getElementById("chatbox");
    if (chatBox == null) return;
    if (chatCollector.isUse) {
      divideContainer();
    } else {
      restoreContainer();
    }
  } else {
    chatCollector = { isUse: false };
    restoreContainer();
  }
}

function filter(nickname: string, rawUserId: string, grade: string): boolean {
  let flag = 0;
  const lastIndex = rawUserId.indexOf("(");
  let userId: string;
  if (lastIndex == -1) {
    userId = rawUserId;
  } else {
    userId = rawUserId.substring(0, lastIndex);
  }

  nicks.forEach((user: User) => {
    if (user.isNickname && user.user == nickname) {
      flag = 1;
      return;
    }
  });
  ids.forEach((user: User) => {
    if (!user.isNickname && user.user == userId) {
      flag = 1;
      return;
    }
  });
  if (grade == "bj" && toggle.streamer) {
    flag = 1;
  } else if (grade == "manager" && toggle.manager) {
    flag = 1;
  } else if (grade == "topfan" && toggle.topfan) {
    flag = 1;
  } else if (grade == "gudok" && toggle.gudok) {
    flag = 1;
  } else if (grade == "fan" && toggle.fan) {
    flag = 1;
  } else if (grade == "user" && toggle.user) {
    flag = 1;
  }
  return flag == 1;
}

let chatArea: Element | null;
const callback = (
  mutationList: MutationRecord[],
  observer: MutationObserver
) => {
  mutationList.forEach((mutation: MutationRecord) => {
    mutation.addedNodes.forEach((node) => {
      if (node.parentNode == null) return;
      if (node.nodeName == "DL") {
        const aLink = (node as HTMLElement).getElementsByTagName("a");
        const rawUserId = aLink[0].getAttribute("user_id");
        const grade = aLink[0].getAttribute("grade");
        if (rawUserId == null) return;
        if (grade == null) return;
        if (
          filter(aLink[0].innerText, rawUserId, grade) &&
          filterArea != null
        ) {
          (filterArea as HTMLElement).appendChild(node.cloneNode(true));
          (filterArea as HTMLElement).scrollTop = filterArea.scrollHeight;
        }
      }
    });
  });
};

let filterArea: HTMLDivElement;

async function initLocalChatContainer() {
  const chatBox = document.getElementById("chatbox");
  const actionbox = document.getElementById("actionbox");
  const areaHeader = document.querySelector(".area_header");
  const chatArea = document.getElementById("chat_area");
  if (
    chatBox == null ||
    chatArea == null ||
    actionbox == null ||
    areaHeader == null
  )
    return;
  filterArea = chatArea.cloneNode() as HTMLDivElement;
  const parentChat = chatArea.parentNode as Element;
  const v =
    chatBox?.clientHeight -
    actionbox?.clientHeight -
    areaHeader?.clientHeight -
    20;
  const container = document.createElement("div");
  container.id = "afreeca-chat-list-container";
  container.style.setProperty("width", "100%");
  container.style.setProperty("height", v + "px");
  container.style.setProperty("will-change", "scroll-position");

  chatArea.classList.add("live-area");
  filterArea.classList.add("filter-area");
  filterArea.style.display = "none";
  filterArea.style.height = "30%";
  filterArea.style.top = "0px";
  filterArea.style.position = "relative";

  const handleContainer = document.createElement("div");
  const resizeHandle = document.createElement("div");
  resizeHandle.id = "tbc-resize-handle";
  handleContainer.id = "handle-container";
  handleContainer.style.position = "relative";
  handleContainer.appendChild(resizeHandle);
  handleContainer.style.display = "none";

  handleContainer.addEventListener("mousedown", startDrag);
  handleContainer.addEventListener("touchstart", startDrag);
  handleContainer.appendChild(resizeHandle);

  container.appendChild(filterArea);
  container.appendChild(handleContainer);
  container.appendChild(chatArea);
  parentChat.appendChild(container);
}

function CaptureButton() {
  const playerItemList = document.querySelector(".player_item_list");
  const playerItemListUL = playerItemList?.querySelector("ul");
  const li = document.createElement("li");
  li.classList.add("share");
  const tooltip = document.createElement("div");
  tooltip.classList.add("sub_tooltip");
  tooltip.innerText = "방송 캡처";
  tooltip.style.setProperty("transform", "translate(-80%, 0)");
  const span = document.createElement("span");
  span.innerText = "방송 캡처";

  const captureButton = document.createElement("button");
  captureButton.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      const video = document.getElementById("livePlayer") as HTMLVideoElement;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (!context) return;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = `afreecaTV_plus_${new Date().getTime()}.png`;
      downloadLink.click();
    } catch (err) {}
  });
  captureButton.style.setProperty("width", "21px");
  captureButton.style.setProperty("height", "21px");
  captureButton.innerHTML =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M3,9A1,1,0,0,0,4,8V5A1,1,0,0,1,5,4H8A1,1,0,0,0,8,2H5A3,3,0,0,0,2,5V8A1,1,0,0,0,3,9ZM8,20H5a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H8a1,1,0,0,0,0-2ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14ZM19,2H16a1,1,0,0,0,0,2h3a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,19,2Zm2,13a1,1,0,0,0-1,1v3a1,1,0,0,1-1,1H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V16A1,1,0,0,0,21,15Z" fill="#6563ff"/> </svg>';
  const updatedSvg = captureButton.querySelector("svg");
  if (updatedSvg == null) return;
  updatedSvg.style.setProperty("vertical-align", "middle");
  captureButton.appendChild(span);
  li.appendChild(captureButton);
  li.appendChild(tooltip);
  playerItemListUL?.appendChild(li);
}

function CollectorChange() {
  const playerItemList = document.querySelector(".player_item_list");
  const playerItemListUL = playerItemList?.querySelector("ul");
  const li = document.createElement("li");
  li.classList.add("share");
  const tooltip = document.createElement("div");
  tooltip.classList.add("sub_tooltip");
  tooltip.innerText = "콜렉터 상하변경";
  tooltip.style.setProperty("transform", "translate(-80%, 0)");
  const span = document.createElement("span");
  span.innerText = "콜렉터 상하변경";

  const collectorChangeButton = document.createElement("button");
  collectorChangeButton.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      const chatContainer = document.getElementById(
        "afreeca-chat-list-container"
      );
      if (chatContainer == null) return;

      const filterElement = document.querySelector(".filter-area");
      const liveElement = document.querySelector(".live-area");
      const handler = document.getElementById("handle-container");

      if (filterElement && liveElement) {
        if (!collectorChangeFlag) {
          collectorChangeFlag = true;
          chatContainer.insertBefore(liveElement, handler);
          chatContainer.insertBefore(filterElement, null);
        } else {
          collectorChangeFlag = false;
          chatContainer.insertBefore(filterElement, handler);
          chatContainer.insertBefore(liveElement, null);
        }
      }
    } catch (err) {}
  });
  collectorChangeButton.style.setProperty("width", "21px");
  collectorChangeButton.style.setProperty("height", "21px");
  collectorChangeButton.innerHTML =
    '<svg id="Layer_1" style="enable-background:new 0 0 120 120;" version="1.1" viewBox="0 0 120 120" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">\n' +
    "\t.st0{fill:none;}\n" +
    "\t.st1{fill:#386BFF;}\n" +
    "\t.st2{fill:#5DE88B;}\n" +
    '</style><line class="st0" x1="60" x2="60" y1="-67.7" y2="-73.2"/><g><path class="st1" d="M55.4,46.1L37.3,21.5c-1.2-1.6-3.6-1.6-4.7,0L14.4,46.1c-1.4,1.9,0,4.7,2.4,4.7h8.3v46c0,1.6,1.3,2.9,2.9,2.9   h13.8c1.6,0,2.9-1.3,2.9-2.9v-46H53C55.4,50.8,56.8,48.1,55.4,46.1z"/><path class="st2" d="M105.6,73.9L87.5,98.5c-1.2,1.6-3.6,1.6-4.7,0L64.6,73.9c-1.4-1.9,0-4.7,2.4-4.7h8.2v-46   c0-1.6,1.3-2.9,2.9-2.9H92c1.6,0,2.9,1.3,2.9,2.9v46h8.3C105.6,69.2,107,71.9,105.6,73.9z"/></g></svg>';
  const updatedSvg = collectorChangeButton.querySelector("svg");
  if (updatedSvg == null) return;
  updatedSvg.style.setProperty("vertical-align", "middle");
  collectorChangeButton.appendChild(span);
  li.appendChild(collectorChangeButton);
  li.appendChild(tooltip);
  playerItemListUL?.appendChild(li);
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const currentHeight = entry.contentRect.height;
    const actionbox = document.getElementById("actionbox");
    const areaHeader = document.querySelector(".area_header");
    if (actionbox == null || areaHeader == null) return;
    const h =
      currentHeight - actionbox.clientHeight - areaHeader.clientHeight - 20;
    if (previousData == null) {
      previousData = h;
      divideContainer();
    } else if (previousData != h) {
      previousData = h;
      const filterArea = document.querySelector(".filter-area");
      if (filterArea == null) {
        divideContainer();
      } else {
        divideContainer();
      }
    }
  }
});

async function divideContainer() {
  const container = document.getElementById("afreeca-chat-list-container");
  if (container == null) return;
  container.style.setProperty("position", "absolute");
  (filterArea as HTMLElement).style.removeProperty("display");
  const handler = document.getElementById("handle-container");
  if (handler == null) return;
  handler.style.removeProperty("display");
  const liveArea = document.querySelector(".live-area");
  if (liveArea == null) return;
  (liveArea as HTMLElement).style.setProperty("position", "relative");
  // const index = (filterArea as HTMLElement).style.height.indexOf('%');
  // const filterAreaHeightNumber = (filterArea as HTMLElement).style.height.substring(0, index);
  // const filterAreaHeight = 100 - Number(filterAreaHeightNumber);
  // (liveArea as HTMLElement).style.setProperty('height', filterAreaHeight + '%');
  (liveArea as HTMLElement).style.setProperty("top", "0px");
  const position = await chrome.storage.local.get("position");
  const containerRatio = await chrome.storage.local.get("containerRatio");
  if (position.position && containerRatio.containerRatio) {
    updateContainerRatio(containerRatio.containerRatio, position.position);
  }
}

function restoreContainer() {
  const container = document.getElementById("afreeca-chat-list-container");
  if (container == null) return;
  container.style.removeProperty("position");
  const filterArea = document.querySelector(".filter-area");
  if (filterArea == null) return;
  (filterArea as HTMLElement).style.setProperty("display", "none");
  const handler = document.getElementById("handle-container");
  if (handler == null) return;
  handler.style.setProperty("display", "none");
  const liveArea = document.querySelector(".live-area");
  if (liveArea == null) return;
  (liveArea as HTMLElement).style.removeProperty("position");
  (liveArea as HTMLElement).style.removeProperty("height");
  (liveArea as HTMLElement).style.removeProperty("top");
}

window.addEventListener("load", async () => {
  chatArea = document.getElementById("chat_area");
  if (!chatArea) return;
  await initLocalChatContainer();
  await updateNickname();
  await updateId();
  await updateToggle();
  chatCollector = await getCollector();
  if (chatCollector.isUse) {
    await divideContainer();
  } else restoreContainer();
  // const t = document.getElementById("chatbox");
  // if (t != null) {
  //     resizeObserver.observe(t);
  // }
  CaptureButton();
  CollectorChange();
  const observer = new MutationObserver(callback);
  if (chatArea) {
    observer.observe(chatArea as Node, config);
  } else {
  }
});

chrome.storage.local.onChanged.addListener(async (changes) => {
  await updateNickname();
  await updateId();
  await updateToggle();
  chatCollector = await getCollector();
  if (chatCollector.isUse) {
    await divideContainer();
  } else restoreContainer();
});

let position: string = "up";
let containerRatio = 0;

const getPosition = (container: HTMLDivElement) => {
  return container.style.order === "1" ? "up" : "down";
};

const startDrag = function (e: MouseEvent | TouchEvent) {
  e.preventDefault();

  if (!filterArea) return;
  if (!collectorChangeFlag) {
    filterArea.classList.add("freeze");
    position = getPosition(filterArea);
  } else {
    const liveArea = document.querySelector(".live-area") as HTMLDivElement;
    if (liveArea == null) return;
    liveArea.classList.add("freeze");
    position = getPosition(liveArea);
  }

  window.addEventListener("mousemove", doDrag);
  window.addEventListener("touchmove", doDrag);
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);
};

const doDrag = (e: MouseEvent | TouchEvent) => {
  const chatListContainer = document.getElementById(
    "afreeca-chat-list-container"
  );

  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  let rectHeight = 0;

  if (chatListContainer) {
    const rect = chatListContainer.getBoundingClientRect();
    rectHeight = rect.height - 77 - 62;

    containerRatio = (1 - (clientY - rect.y - 77) / rectHeight) * 100;
    containerRatio = Math.max(0, Math.min(100, Math.round(containerRatio)));
    updateContainerRatio(containerRatio, position);
  }
};

const endDrag = function () {
  if (!collectorChangeFlag) {
    filterArea.classList.remove("freeze");
  } else {
    const liveArea = document.querySelector(".live-area") as HTMLDivElement;
    if (liveArea == null) return;
    liveArea.classList.remove("freeze");
  }

  chrome.storage.local.set({ containerRatio, position });
  // chrome.storage.local.set({position});
  window.removeEventListener("mousemove", doDrag);
  window.removeEventListener("touchmove", doDrag);
  window.removeEventListener("mouseup", endDrag);
  window.removeEventListener("touchend", endDrag);
};

function updateContainerRatio(ratio: number, position: string) {
  if (ratio != 0) ratio = ratio ? ratio : 30;

  let orig_size = ratio === 0 ? 1 : ratio === 10 ? 0 : 1;
  let clone_size = ratio === 0 ? 0 : ratio === 10 ? 1 : 0;

  if (1 <= ratio && ratio <= 100) {
    clone_size = parseFloat((ratio * 0.01).toFixed(2));
    orig_size = parseFloat((1 - clone_size).toFixed(2));
  }

  if (position === "down") {
    [orig_size, clone_size] = [clone_size, orig_size];
  }

  if (!collectorChangeFlag) {
    const orig = document.querySelector(".live-area");
    const clone = document.querySelector(".filter-area");
    if (!orig || !clone) return;

    (orig as HTMLDivElement).style.height = `${orig_size * 100}%`;
    (clone as HTMLDivElement).style.height = `${clone_size * 100}%`;
    // chrome.storage.local.set({filteringPercentage: clone_size * 100});
  } else {
    const orig = document.querySelector(".filter-area");
    const clone = document.querySelector(".live-area");
    if (!orig || !clone) return;

    (orig as HTMLDivElement).style.height = `${orig_size * 100}%`;
    (clone as HTMLDivElement).style.height = `${clone_size * 100}%`;
    // chrome.storage.local.set({filteringPercentage: orig_size * 100});
  }
}

const qwer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const currentHeight = entry.contentRect.height;
    const actionbox = document.getElementById("actionbox");
    const areaHeader = document.querySelector(".area_header");
    if (actionbox == null || areaHeader == null) return;
    const h =
      currentHeight - actionbox.clientHeight - areaHeader.clientHeight - 20;
    const container = document.getElementById("afreeca-chat-list-container");
    if (container == null) return;
    const filterArea = document.querySelector(".filter-area");
    if (filterArea == null) return;
    const liveArea = document.querySelector(".live-area");
    if (liveArea == null) return;
    container.style.setProperty("height", h + "px");
    if (chatCollector.isUse) {
      divideContainer();
      const index = (filterArea as HTMLElement).style.height.indexOf("%");
      const filterAreaHeightNumber = (
        filterArea as HTMLElement
      ).style.height.substring(0, index);
      const filterAreaHeight = 100 - Number(filterAreaHeightNumber);
      (liveArea as HTMLElement).style.setProperty(
        "height",
        filterAreaHeight + "%"
      );
    } else {
      restoreContainer();
    }
  }
});

const t = document.getElementById("chatbox");
if (t != null) {
  qwer.observe(t);
}

const qqq = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const chatbox = document.getElementById("chatbox");
    const actionbox = document.getElementById("actionbox");
    const areaHeader = document.querySelector(".area_header");
    if (chatbox == null || actionbox == null || areaHeader == null) return;
    const h =
      chatbox.clientHeight -
      actionbox.clientHeight -
      areaHeader.clientHeight -
      20;
    const container = document.getElementById("afreeca-chat-list-container");
    if (container == null) return;
    const filterArea = document.querySelector(".filter-area");
    if (filterArea == null) return;
    const liveArea = document.querySelector(".live-area");
    if (liveArea == null) return;
    container.style.setProperty("height", h + "px");
    if (chatCollector.isUse) {
      divideContainer();
      const index = (filterArea as HTMLElement).style.height.indexOf("%");
      const filterAreaHeightNumber = (
        filterArea as HTMLElement
      ).style.height.substring(0, index);
      const filterAreaHeight = 100 - Number(filterAreaHeightNumber);
      (liveArea as HTMLElement).style.setProperty(
        "height",
        filterAreaHeight + "%"
      );
    } else {
      restoreContainer();
    }
  }
});

const tt = document.getElementById("actionbox");
if (tt != null) {
  qqq.observe(tt);
}
