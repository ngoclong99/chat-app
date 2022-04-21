import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, Input, TextArea } from 'antd'
import Message from './Message'
import { addDocument } from './../../../firebase/services'
import { AuthContext } from '../../Context/AuthProvider'
import { AppContext } from './../../Context/AppProvider'
import useFirebaseStore from './../../../hook/useFirebaseStore'

ChatContent.propTypes = {}

const ContentStyles = styled.div`
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  justify-content: flex-end;
`
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`
const FormStyled = styled(Form)`
  margin: 30px 0;
  display: flex;
  .ant-form-item {
    margin-bottom: 0;
  }
  .message-input {
    flex: 1;
    textarea {
      resize: none;
    }
  }
  .message-submit {
    margin-left: 10px;
    align-self: center;
  }
`

function ChatContent(props) {
  const [inputValue, setInputValue] = useState('')
  const {
    authUser: { uid, photoURL, displayName }
  } = React.useContext(AuthContext)
  const { selectedRoom } = React.useContext(AppContext)

  const [form] = Form.useForm()

  const handleInputchange = (e) => {
    const value = e.target.value
    setInputValue(value)
  }
  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    })
    form.resetFields(['message'])
  }

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
    }),
    [selectedRoom.id]
  )

  const messages = useFirebaseStore('messages', condition)
  return (
    <ContentStyles>
      <MessageListStyled>
        <>
          {messages?.map((mes) => (
            <Message message={mes} key={mes.id} />
          ))}
        </>
      </MessageListStyled>
      <FormStyled form={form}>
        <Form.Item className="message-input" name="message">
          <Input
            placeholder="Nhập tin nhắn ..."
            autoComplete="off"
            onPressEnter={handleOnSubmit}
            onChange={handleInputchange}
          />
        </Form.Item>
        <Button type="primary" onClick={handleOnSubmit} className="message-submit">
          Gửi
        </Button>
      </FormStyled>
    </ContentStyles>
  )
}

export default ChatContent
