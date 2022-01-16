import * as React from 'react';

export interface ToggleProps {
    ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Toggle(Props: ToggleProps) {
    return <button onClick={Props.ClickHandler}>Toggle</button>
}