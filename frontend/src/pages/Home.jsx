import React, { useState, useEffect } from "react";
import { Modal, FloatButton } from "antd";
import {
  QuestionCircleOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import CustomerServiceModal from "./CustomerServiceModal";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const AIBoTitleText = <p style={{ color: "#18b96b" }}><RobotOutlined /> Customer Service Chat</p>;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    window.voiceflow.chat.load({
      verify: { projectID: '661941f0ac2c4721d7306dc6' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production'
    });
  }, []);

  return (
    <div>
      <div>Home</div>
      <FloatButton
        icon={<QuestionCircleOutlined />}
        onClick={showModal}
        type="primary"
        style={{
          right: 55,
        }}
      />
      <Modal
        title={AIBoTitleText}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{
          position: "absolute",
          top: window.innerHeight - 650,
          right: 55,
          maxWidth: "400px",
        }}
        bodyStyle={{ overflow: "hidden", padding: "20px 0px" }}
      >
        <CustomerServiceModal />
      </Modal>
    </div>
  );
};

export default Home;