import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { Background } from "../components/Background";

export const ScanQR = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("DividePay");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Background>
      <View style={styles.container}>
        <Title text="QR 코드를 스캔해주세요." style={styles.title}></Title>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.scan]}
        />
        <Button
          style={styles.btn}
          title={"다시 스캔하기"}
          onPress={() => setScanned(false)}
          disabled={!scanned}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    // marginTop: 10,
    // flex: 0.3,
  },
  scan: {
    // flex: 0.5,
    height: 450,
    marginTop: 70,
  },
  btn: {
    // flex: 0.3,
    // marginBottom: 30,
  },
});
