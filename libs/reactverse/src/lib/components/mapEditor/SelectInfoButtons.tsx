import { Button } from "antd";
import { useEditor, types } from "../../stores";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const SelectInfoButtons = ({
  modify,
  remove,
  placeId,
}: {
  modify?: (placeId: string) => void;
  remove: (placeId: string) => void;
  placeId: string;
}) => {
  return (
    <ButtonsArea>
      {modify && (
        <Button icon={<EditOutlined />} onClick={() => modify(placeId)} size="small">
          modify
        </Button>
      )}

      <Button icon={<DeleteOutlined />} onClick={() => remove(placeId)} size="small">
        delete
      </Button>
    </ButtonsArea>
  );
};

const ButtonsArea = styled.div`
  text-align: right;
  svg {
    vertical-align: baseline;
  }
  button {
    margin-left: 4px;
  }
`;
