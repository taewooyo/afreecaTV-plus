import React, {ReactNode} from 'react';
import {User} from "@/src/model/User";

interface NicknameProps {
    nick: User[];
    children: ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Nickname: React.FC<NicknameProps> = ({nick, children, onClick}) => {
    return (
        <>
            {children}
            <div>
                {nick.map((e, id) => (
                    <div style={
                        {
                            backgroundColor: "#0daedd",
                            color: "white",
                            margin: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }
                    } key={id} onClick={onClick}>{e.user}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Nickname;