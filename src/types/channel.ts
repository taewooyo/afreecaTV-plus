import {FavoriteChannelData} from "@/src/model/FavoriteChannelData";

export interface ChannelProps {
    channels: FavoriteChannelData[];
    onClick: (e: React.MouseEvent<HTMLDivElement>, url: string) => void;
}