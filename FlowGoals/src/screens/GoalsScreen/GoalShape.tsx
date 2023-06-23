import { useIsFocused } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import tinycolor from 'tinycolor2';

interface GoalShapeProps {
  size: number,
  width: number,
  fill: number,
  mainColor: string,
  backgroundColor: string,
}

function GoalShape({
  size, width, fill, mainColor,
}: GoalShapeProps) {
  const isFocused = useIsFocused();
  const progressRef = useCallback((ref: AnimatedCircularProgress) => {
    if (ref) {
      ref.reAnimate(0, fill, fill * 20, Easing.out(Easing.quad));
    }
  }, [isFocused]);
  const backgroundColor = tinycolor(mainColor).lighten(30).toHexString();

  return (
    <AnimatedCircularProgress
      ref={progressRef}
      size={size}
      width={width}
      fill={fill}
      tintColor={mainColor}
      backgroundColor={backgroundColor}
      duration={fill * 20} // range 0-2000 ms based off fill
      easing={Easing.out(Easing.quad)}
      rotation={0}
      lineCap="round"
    />
  );
}

export default GoalShape;
