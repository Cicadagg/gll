import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleAnimations } from '../../store/slices/animationSlice';

export const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
    const isAnimationsEnabled = useSelector((state: RootState) => state.animation.isAnimationsEnabled);
    return <div className={!isAnimationsEnabled ? 'animations-disabled' : ''}>{children}</div>;
}; 