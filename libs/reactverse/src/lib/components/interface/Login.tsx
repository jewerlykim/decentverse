import { useEffect, useRef, useState } from "react";
import { useGossip, useWorld, useUser, types } from "../../stores";
import styled, { keyframes } from "styled-components";
import { AdminModal } from "./index";
import { isMobile } from "react-device-detect";
import { KlaytnIcon, MetamaskIcon } from "../common";
import { Button, Input, Carousel } from "antd";
import { CharacterBox, GuestButton, KaikasButton, MetamaskButton } from "./";

export const Login = () => {
  const user = useUser((state) => state.user);
  const characters = useUser((state) => state.characters);
  const loginMethod = useUser((state) => state.loginMethod);
  const logout = useUser((state) => state.logout);
  const skipLoginProcess = useUser((state) => state.skipLoginProcess);
  const connectMetamask = useUser((state) => state.connectMetamask);
  const connectKaikas = useUser((state) => state.connectKaikas);
  const loginAsGuest = useUser((state) => state.loginAsGuest);
  const setNickname = useUser((state) => state.setNickname);
  const updateUser = useUser((state) => state.updateUser);
  const initWorld = useWorld((state) => state.initWorld);
  const testImages = [
    "./images.png",
    "./images.png",
    "./images.png",
    "./images.png",
    "./images.png",
    "./images.png",
    "./images.png",
    "./images.png",
  ];
  const onClickSubmit = () => {
    updateUser();
    initWorld(characters[0] ?? types.defaultCharacter);
  };
  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && onClickSubmit();

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("guest=true")) {
      skipLoginProcess();
      initWorld(characters[0] ?? types.defaultCharacter);
    } else setNickname("");
  }, []);
  return (
    <Container>
      <AdminModal />
      <div className="Title">AYIAS</div>
      {loginMethod === "none" ? (
        <>
          {!isMobile && <KaikasButton onClick={connectKaikas} />}
          {!isMobile && <MetamaskButton onClick={connectMetamask} />}
          <GuestButton onClick={loginAsGuest} />
        </>
      ) : (
        <>
          <InputBox onKeyPress={keyPress}>
            <InputNickname
              autoFocus
              placeholder="  Type your nickname!"
              value={user.nickname}
              onChange={(e: any) => setNickname(e.target.value)}
            />
            <Submit onClick={onClickSubmit}>Next</Submit>
          </InputBox>
          <CharacterBox characters={testImages} />

          <Goback onClick={logout}>Back</Goback>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 50px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #083266;
  @media screen and (max-width: 800px) {
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-overflow-scrolling: none;
    /* 이외의 브라우저 */
    overscroll-behavior: none;
  }
  .Title {
    font-size: 120px;
    margin-bottom: 300px;
    @media screen and (max-width: 800px) {
      font-size: 60px;
      margin-bottom: 60px;
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding-left: 0px;
`;
const InputNickname = styled(Input)`
  width: 80%;
  height: auto;
  font-size: 28px;
  border-width: 3px;
  margin-right: 10px;
  padding-left: 10px;
  border-width: 0px;
  border-color: #3258d4;
  color: black;
  display: flex;
  align-self: center;
  justify-self: center;
  border-radius: 10px;
  background: white;
  @media screen and (max-width: 800px) {
    width: 80%;
    /* height: auto; */
    font-size: 18px;
    border-width: 3px;
    margin-right: 5px;
    padding-left: 10px;
    border-color: #3258d4;
    color: black;
    display: flex;
    align-self: center;
    justify-self: center;
    border-radius: 10px;
    background: white;
  }
`;
const Submit = styled(Button)`
  width: auto;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  /* color: white; */
  /* background: #3258d4; */
  align-self: center;
  justify-self: center;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    height: auto;
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    align-items: center;

    /* color: white; */
    /* background: #3258d4; */
    align-self: center;
    justify-self: center;
    border-radius: 10px;
  }
  :hover {
    opacity: 0.8;
    /* background: #3ed06c; */
  }
`;
const Goback = styled(Button)`
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  background: gray;
  align-self: center;
  justify-self: center;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    width: auto;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
    background: gray;
    align-self: center;
    justify-self: center;
    border-radius: 10px;
  }
  :hover {
    background-color: gray;
    color: white;
    border-color: white;
    opacity: 0.8;
  }
`;