import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleAnimations } from '../../store/slices/animationSlice';
import './AnimationToggle.css';

export const AnimationToggle = () => {
    const dispatch = useDispatch();
    const isEnabled = useSelector((state: RootState) => state.animation.isAnimationsEnabled);

    return (
        <label className="animation-toggle">
            <input
                type="checkbox"
                checked={isEnabled}
                onChange={() => dispatch(toggleAnimations())}
            />
            <span className="animation-toggle-slider" />
        </label>
    );
}; 