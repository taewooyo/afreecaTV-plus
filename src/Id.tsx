import React, {ReactNode} from "react";
import {User} from "@/src/model/User";

interface IdProps {
    userId: User[];
    children?: ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Id = ({userId, children, onClick}: IdProps) => {
    return (
        <>
            {children}
            <div>
                {userId.map((e, id) => (
                    <div
                        style={{
                            background: "linear-gradient(#C6F40AFF, #EDE80CFF)",
                            color: "#000",
                            margin: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            maxWidth: "200px",
                            textOverflow: "ellipsis"
                        }}
                        key={id}
                        onClick={onClick}
                    >
                        {e.user}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Id;
