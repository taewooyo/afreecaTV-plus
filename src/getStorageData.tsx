import {User} from './model/User';
import {ToggleData} from "@/src/model/ToggleData";
import {ChatCollectorData} from "@/src/model/ChatCollectorData";

const getNicks = async (): Promise<User[]> => {
    const res: { [p: string]: User[] } = await chrome.storage.local.get('nicks');
    if (res.nicks) return res.nicks;
    else return [];
}

const getIds = async (): Promise<User[]> => {
    const res: { [p: string]: User[] } = await chrome.storage.local.get('ids');
    if (res.ids) return res.ids;
    else return [];
}

const getToggle = async (): Promise<ToggleData> => {
    const res = await chrome.storage.local.get('toggle');
    if (res.toggle) return res.toggle;
    else return {streamer: false, manager: false, topfan: false, gudok: false, fan: false, user: false}
}

const getCollector = async (): Promise<ChatCollectorData> => {
    const res = await chrome.storage.local.get('collector');
    if (res.collector) return res.collector;
    else return {isUse: false}
}

export {getNicks, getIds, getToggle, getCollector};