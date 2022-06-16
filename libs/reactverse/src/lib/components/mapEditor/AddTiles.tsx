import styled from "styled-components";
import { Modal, Button, Space } from "antd";
import { useMapEditor } from "../../stores";

export const AddTiles = () => {
  const { isTilesModalOpen, toggleTilesModalOpen, addMapFile, addTiles, validationCheck } = useMapEditor().tileTool;
  const { mapData } = useMapEditor();

  const handleImageUpload = (e: any, type: "bottom" | "top" | "lighting") => {
    const files = e.target.files;
    if (!files || files.length !== 1) return;
    addMapFile(files[0], type);
  };

  if (!mapData) return null;

  return (
    <>
      <Button type="primary" block onClick={toggleTilesModalOpen}>
        Add Tiles
      </Button>

      <Modal
        title={`Add Tiles: ${mapData.name} `}
        visible={isTilesModalOpen}
        onOk={addTiles}
        onCancel={toggleTilesModalOpen}
        okButtonProps={{ disabled: !validationCheck() }}
      >
        <FileForm>
          <Space style={{ marginTop: 10 }}>
            <div className="label">
              <span>*</span>Bottom
            </div>
            <input type="file" onChange={(e) => handleImageUpload(e, "bottom")} />
          </Space>
          <Space style={{ marginTop: 10 }}>
            <div className="label">Top</div>
            <input type="file" onChange={(e) => handleImageUpload(e, "top")} />
          </Space>
        </FileForm>
      </Modal>
    </>
  );
};

const FileForm = styled.div`
  .label {
    width: 100px;
    text-align: right;
    font-weight: bolder;
    span {
      color: #ff6666;
      margin-right: 4px;
    }
  }
`;