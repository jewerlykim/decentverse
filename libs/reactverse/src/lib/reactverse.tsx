import React, { useState, useEffect } from "react";
import { client, setLink } from "./stores";
import { Stream, Game, Interface, InputName, ReactverseLayout, MapEditor } from "./components";
import { io, Socket as Soc } from "socket.io-client";
import { useGossip, useWorld, useUser, useMapEditor, types } from "./stores";

export interface ReactverseProps {
  uri: string;
  ws: string;
}

export const Reactverse = ({ uri, ws }: ReactverseProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Soc>();
  const me = useUser((state) => state);
  const isMapEditorOpen = useMapEditor((state) => state.isMapEditorOpen);
  useEffect(() => {
    console.log(1);
    console.log(2, ws);
    document.body.style.overflow = "hidden";
    setLink(uri);
    const socket = io(ws);
    setSocket(socket);
    socket.on("connect", () => setIsConnected(true));
    console.log(isConnected, socket);
  }, []);

  if (isMapEditorOpen) {
    return (
      <ReactverseLayout>
        <MapEditor />
      </ReactverseLayout>
    );
  }

  if (!me.nickname && socket) {
    return (
      <ReactverseLayout>
        <Interface socket={socket} />
        {/* <InputName /> */}
      </ReactverseLayout>
    );
  }

  return (
    <ReactverseLayout>
      {isConnected && socket ? (
        <>
          <Game socket={socket} />
          {/* <Stream socket={socket} /> */}
          <Interface socket={socket} />
        </>
      ) : (
        <></>
      )}
    </ReactverseLayout>
  );
};
