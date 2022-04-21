import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { debounce } from 'lodash'
import React from 'react'
import { db } from '../../firebase/config'
import { AppContext } from '../Context/AppProvider'
AddMemberModal.propTypes = {}

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  // search
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const debounceFetch = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([])
      setFetching(true)

      fetchOptions(value, props.curMembers).then((newOptions) => {
        setOptions(newOptions)
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions, props.curMembers])
  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options?.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar src={opt.photoURL} size="small">
            {opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  )
}

function AddMemberModal(props) {
  const { isAddMemberVisible, setIsAddMemberVisible, selectedRoom } = React.useContext(AppContext)
  const [form] = Form.useForm()
  const [value, setValue] = React.useState([])
  const handleOk = () => {
    form.resetFields()
    // lấy ra rooms có id = selectedRoom.id
    const roomRef = db.collection('rooms').doc(selectedRoom.id)
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)]
    })
    setIsAddMemberVisible(false)
  }
  const handleCancel = () => {
    setIsAddMemberVisible(false)
  }

  // DL tra ve
  async function fetchUserList(search) {
    return db
      .collection('users')
      .where('keywords', 'array-contains', search)
      .orderBy('displayName')
      .limit(20)
      .get()
      .then((snapshot, curMembers) => {
        return snapshot.docs
          .map((doc) => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
          }))
          .filter((opt) => !curMembers?.includes(opt.value))
      })
  }

  return (
    <Modal
      title="Mời thêm thành viên"
      visible={isAddMemberVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} lauout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: '100%' }}
          curMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  )
}

export default AddMemberModal
