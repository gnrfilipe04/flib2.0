import styled, { css } from 'styled-components/native';

export interface FieldProps {
    activeColor: string;
    type?: 'outline' | 'filled';
}

export const Container = styled.View`
    justify-content: center;
    
`;

export const Field = styled.TextInput<FieldProps>`
    color: white;
    border-color: ${props => props.activeColor};
    
    ${({type}) => {

        return type === 'outline' 
            ?   css`
                    border-width: 2px;
                    padding: 16px;
                    border-radius: 4px;
                `
            :   css`
                    border-bottom-width: 2px;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                    background-color: rgba(255,255,255,0.1);
                    padding: 26px 16px 5px 16px;
                `
        }   
    }
`;