import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Canvas, Circle, Path, Skia} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;

const Litio = () => {
  const rotation1 = useSharedValue(0);
  const rotation2 = useSharedValue(0);

  useEffect(() => {
    rotation1.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    rotation2.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation1, rotation2]);

  // Camada 1 - dois elétrons opostos
  const angleK1 = useDerivedValue(() => (rotation1.value * Math.PI) / 180);
  const angleK2 = useDerivedValue(() => angleK1.value + Math.PI);

  const r1 = 50;
  const electronK1 = {
    cx: useDerivedValue(() => centerX + r1 * Math.cos(angleK1.value)),
    cy: useDerivedValue(() => centerY + r1 * Math.sin(angleK1.value)),
  };
  const electronK2 = {
    cx: useDerivedValue(() => centerX + r1 * Math.cos(angleK2.value)),
    cy: useDerivedValue(() => centerY + r1 * Math.sin(angleK2.value)),
  };

  // Camada 2 - um elétron
  const angleL1 = useDerivedValue(() => (rotation2.value * Math.PI) / 180);
  const r2 = 90;
  const electronL1 = {
    cx: useDerivedValue(() => centerX + r2 * Math.cos(angleL1.value)),
    cy: useDerivedValue(() => centerY + r2 * Math.sin(angleL1.value)),
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* Nosso Núcleo */}
        <Circle cx={centerX - 8} cy={centerY + 6} r={10} color="#FFA500" />
        <Circle cx={centerX + 8} cy={centerY + 6} r={10} color="#FF8C00" />
        <Circle cx={centerX} cy={centerY - 6} r={10} color="#FFD700" />

        {/* Órbitas das nossas camadas de valência */}
        <Path
          path={Skia.Path.Make().addCircle(centerX, centerY, r1)}
          color="rgba(255,255,255,0.2)"
          style="stroke"
          strokeWidth={1}
        />
        <Path
          path={Skia.Path.Make().addCircle(centerX, centerY, r2)}
          color="rgba(255,255,255,0.2)"
          style="stroke"
          strokeWidth={1}
        />

        {/* Elétrons camada K */}
        <Circle cx={electronK1.cx} cy={electronK1.cy} r={5} color="#00FFFF" />
        <Circle cx={electronK2.cx} cy={electronK2.cy} r={5} color="#00FFFF" />

        {/* Elétron camada L */}
        <Circle cx={electronL1.cx} cy={electronL1.cy} r={5} color="#7FFF00" />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  canvas: {
    flex: 1,
  },
});

export default Litio;
