import { createSlice } from '@reduxjs/toolkit';

interface AnimationState {
    isAnimationsEnabled: boolean;
}

const initialState: AnimationState = {
    isAnimationsEnabled: true
};

const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
        toggleAnimations: (state) => {
            state.isAnimationsEnabled = !state.isAnimationsEnabled;
        }
    }
});

export const { toggleAnimations } = animationSlice.actions;
export const animationReducer = animationSlice.reducer;

export const TOGGLE_ANIMATIONS = 'animation/toggleAnimations';

export const toggleAnimationsRedux = () => ({
    type: TOGGLE_ANIMATIONS
});

export const animationReducerRedux = (state = initialState, action: { type: string }) => {
    switch (action.type) {
        case TOGGLE_ANIMATIONS:
            return {
                ...state,
                isAnimationsEnabled: !state.isAnimationsEnabled
            };
        default:
            return state;
    }
}; 