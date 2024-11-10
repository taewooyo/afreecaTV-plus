import {ChannelProps} from "@/src/types/channel";
import React from "react";
import {ChannelContainer, ChannelHashTag, ChannelImage} from "./style";

const Channel = ({channels, onClick}: ChannelProps) => {
    return (
        <>
            <ChannelContainer>
                {channels.map((channel, id) => (
                    <div onClick={(e) => onClick(e, channel.broad_info[0].url)}
                         style={{
                             display: "flex",
                             marginBottom: "10px"
                         }}>
                        <ChannelImage key={id}
                                      src={"https:" + channel.broad_info[0].broad_img}
                                      width="196px" height="107px"/>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "10px"
                        }}>

                            {/*스트리머명 / 시청자수*/}
                            <div style={{
                                textAlign: "start",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <span style={
                                    {fontSize: "14px"}
                                }>{channel.user_nick}</span>
                                <div style={{
                                    marginLeft: "10px",
                                    background: "#e9e9e9",
                                    borderRadius: "3px",
                                    paddingLeft: "3px",
                                    paddingRight: "3px",
                                    color: "#000",
                                    textAlign: "center",
                                    verticalAlign: "center"
                                }}>
                                    <span style={{fontSize: "12px"}}>{channel.broad_info[0].total_view_cnt + "명"}</span>
                                </div>
                            </div>

                            {/*방송제목*/}
                            <div style={
                                {
                                    textAlign: "start",
                                    width: "200px",
                                    fontSize: "14px"
                                }
                            }>{channel.broad_info[0].broad_title}
                            </div>

                            <ChannelHashTag>
                                {channel.broad_info[0].category_tags.map((name) => (
                                    <div style={{
                                        background: "#5e5656",
                                        borderRadius: "3px",
                                        paddingLeft: "3px",
                                        paddingRight: "3px",
                                        color: "#fff",
                                        textAlign: "center",
                                        verticalAlign: "center",
                                        marginRight: "5px"
                                    }}>
                                        <span style={{fontSize: "12px"}}>{"#" + name}</span>
                                    </div>
                                ))}
                            </ChannelHashTag>
                        </div>
                    </div>
                ))}
            </ChannelContainer>
        </>
    );
};

export default Channel;
