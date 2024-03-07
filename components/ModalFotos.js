import {StyleSheet, Modal} from "react-native";


export const ModalFotos = ({isOpen, visible}) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={isOpen} animationType="fade">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Imagen</Text>
                </View> 
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
    },
  });

export default ModalFotos;
