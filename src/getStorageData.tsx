import {User} from "./model/User";
import {ToggleData} from "@/src/model/ToggleData";
import {ChatCollectorData} from "@/src/model/ChatCollectorData";
import {ChatSetting} from "@/src/model/ChatSetting";
import {ChatTwoLine} from "@/src/model/ChatTwoLine";
import {TopfanBadge} from "@/src/model/TopfanBadge";
import {SupportBadge} from "@/src/model/SupportBadge";
import {SubscribeBadge} from "@/src/model/SubscribeBadge";
import {FanBadge} from "@/src/model/FanBadge";
import {Divider} from "@/src/model/Divider";


export const getNicks = async (): Promise<User[]> => {
    const res: { [p: string]: User[] } = await chrome.storage.local.get("nicks");
    if (res.nicks) return res.nicks;
    else return [];
};

export const getIds = async (): Promise<User[]> => {
    const res: { [p: string]: User[] } = await chrome.storage.local.get("ids");
    if (res.ids) return res.ids;
    else return [];
};

export const getToggle = async (): Promise<ToggleData> => {
    const res = await chrome.storage.local.get("toggle");
    if (res.toggle) return res.toggle;
    else
        return {
            streamer: false,
            manager: false,
            topfan: false,
            gudok: false,
            fan: false,
            user: false,
        };
};

export const getCollector = async (): Promise<ChatCollectorData> => {
    const res = await chrome.storage.local.get("collector");
    if (res.collector) return res.collector;
    else return {isUse: false};
};

export const getChatSetting = async (): Promise<ChatSetting> => {
    const res = await chrome.storage.local.get("chatSetting");
    if (res.chatSetting) return res.chatSetting;
    else return {isUse: false};
};

export const getChatTwoLine = async (): Promise<ChatTwoLine> => {
    const res = await chrome.storage.local.get("chatTwoLine");
    if (res.chatTwoLine) return res.chatTwoLine;
    else return {isUse: false};
}

export const getFanBadge = async (): Promise<FanBadge> => {
    const res = await chrome.storage.local.get("fanBadge");
    if (res.fanBadge) return res.fanBadge;
    else return {isUse: false};
}

export const getSubscribeBadge = async (): Promise<SubscribeBadge> => {
    const res = await chrome.storage.local.get("subscribeBadge");
    if (res.subscribeBadge) return res.subscribeBadge;
    else return {isUse: false};
}

export const getSupportBadge = async (): Promise<SupportBadge> => {
    const res = await chrome.storage.local.get("supportBadge");
    if (res.supportBadge) return res.supportBadge;
    else return {isUse: false};
}

export const getTopfanBadge = async (): Promise<TopfanBadge> => {
    const res = await chrome.storage.local.get("topFanBadge");
    if (res.topFanBadge) return res.topFanBadge;
    else return {isUse: false};
}

export const getDivider = async (): Promise<Divider> => {
    const res = await chrome.storage.local.get("divider");
    if (res.divider) return res.divider;
    else return {isUse: false};
}

// export const getScreenMode = async (): Promise<ScreenMode> => {
//     const res = await chrome.storage.local.get("screenMode");
//     if (res.screenMode) return res.screenMode;
//     else return {isUse: false};
// }