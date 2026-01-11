import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const CreditCardIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="1"
      y="4"
      width="22"
      height="16"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 10H23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
