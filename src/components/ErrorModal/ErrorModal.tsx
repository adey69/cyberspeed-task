import { Dispatch, SetStateAction, memo } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Typography } from '..';
import styles from './styles';
import { APP_TEXT } from '../../strings';

interface IErrorModalProps {
  message: string;
  visible?: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal = ({
  visible,
  message,
  setModalVisible,
}: IErrorModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Typography style={styles.modalText}>{message}</Typography>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.5}
            onPress={() => setModalVisible(false)}>
            <Typography style={styles.closeButtonText}>
              {APP_TEXT.close}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ErrorModal);
