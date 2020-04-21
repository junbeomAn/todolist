import React from "react";
import styled, { css, keyframes } from "styled-components";
import { MdAdd } from "react-icons/md";

const slideup = keyframes`
    from {
      padding-bottom: 40px;
    }
    to {
      padding-bottom: 72px;
    }
  `;
const slidedown = keyframes`
  from {
    padding-bottom: 72px;
    opacity: 1;
  }
  to {
    padding-bottom: 0px;
    opacity: 0;
  }  
`;

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(0, 0, 0, 0.5);
  }
  &:active {
    background: #20c997;
  }
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  animation-duration: 0.125s;
  animation-timing-function: ease-out;
  animation-name: ${slideup};
  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${slidedown};
      padding-bottom: 0px;
    `}

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate({
  localOpen,
  open,
  onToggle,
  disappear,
  animate,
  onSubmit,
  setInputRef
}) {
  return (
    <>
      {(localOpen || animate) && (
        <InsertFormPositioner>
          <InsertForm disappear={disappear} onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
              ref={setInputRef}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
export default TodoCreate;
