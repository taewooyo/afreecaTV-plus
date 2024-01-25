import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import '../public/manifest.json';
import {getCollector, getIds, getNicks, getToggle} from './getStorageData';
import {FavoriteChannelData} from "@/src/model/FavoriteChannelData";

(async () => {
    try {
        const container = document.getElementById('root');
        if (container == null) return;
        const root = createRoot(container);
        const nicks = await getNicks()
        const ids = await getIds()
        const toggle = await getToggle()
        const collector = await getCollector()
        const favoriteChannel = await getFavoriteChannel()
        root.render(<App nicks={nicks} ids={ids} toggle={toggle} collector={collector}
                         favoriteChannel={favoriteChannel}/>);
    } catch (e) {

    }
})();


async function getFavoriteChannel() {
    const response = await fetch('https://myapi.afreecatv.com/api/favorite')
    const json = await response.json()
    const data: FavoriteChannelData[] = json.data
    if (data == undefined) return []
    let hasNonEmptyBroadInfo = false;
    for (const item of data) {
        if (item.broad_info.length > 0) {
            hasNonEmptyBroadInfo = true;
            break;
        }
    }

    if (data.length == 0) {
        return []
    } else if (hasNonEmptyBroadInfo) {
        return data.filter(n => n.broad_info.length !== 0)
            .sort(function (a, b) {
                return b.broad_info[0].total_view_cnt - a.broad_info[0].total_view_cnt
            })
    } else {
        return []
    }
}
