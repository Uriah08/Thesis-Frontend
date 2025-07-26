import React, { ReactNode } from 'react'
import { Portal, Dialog } from 'react-native-paper';

type DialogsProps = {
  onVisible: (visible: boolean) => void;
  visible: boolean;
  title: string
  children: ReactNode
};

const Dialogs = ({ onVisible, visible, title, children }: DialogsProps) => {
  return (
    <Portal>
        <Dialog visible={visible} onDismiss={() => onVisible(false)} style={{
            backgroundColor: '#ffffff'
        }}>
            <Dialog.Title
                style={{
                fontFamily: 'PoppinsSemiBold'
            }}>{title}</Dialog.Title>
            {children}
        </Dialog>
    </Portal>
  )
}

export default Dialogs