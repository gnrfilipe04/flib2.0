import React, { ReactNode } from 'react'

import {
    Container
} from './styles'

interface ItemContainerProps {
    children: ReactNode;
    itemSize: number;
}

export function ItemContainer({
    children,
    itemSize
}: ItemContainerProps): JSX.Element {
    return (
        <Container itemSize={itemSize}>
            {children}
        </Container>
    )
}