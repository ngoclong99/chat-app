import React from 'react'
import PropTypes from 'prop-types'
import { AppContext } from './../Context/AppProvider'
import { Modal, Button, Form, Input } from 'antd'
import { addDocument } from './../../firebase/services'
import { AuthContext } from '../Context/AuthProvider'

AddRoomModal.propTypes = {}

function AddRoomModal(props) {
  const { isAddRoomVisible, setIsAddRoomVisible } = React.useContext(AppContext)
  const uid = React.useContext(AuthContext).authUser?.uid

  const [form] = Form.useForm()

  const handleOk = () => {
    addDocument('rooms', {
      ...form.getFieldValue(),
      members: [uid]
    })
    form.resetFields()
    setIsAddRoomVisible(false)
  }
  const handleCancel = () => {
    setIsAddRoomVisible(false)
  }
  return (
    <Modal title="Tạo phòng" visible={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddRoomModal
