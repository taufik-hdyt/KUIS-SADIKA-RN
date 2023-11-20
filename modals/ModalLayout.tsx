import { Modal } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'

interface Props{
  isOpen: boolean
  onClose: (a:boolean)=> void
  children: JSX.Element
  title: string
}
export default function ModalLayout({isOpen,onClose,title,children}:Props) {
  return (
    <SafeAreaView>
       <Modal size="xl" isOpen={isOpen} onClose={() => onClose(false)}>
        <Modal.Content >
          <Modal.CloseButton />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}
