import styled from 'styled-components';

export const Icon = styled.span`
	position: relative;
	display: inline-block;
	width: ${(props) => props.size || props.width || '1rem'};
	height: ${(props) => props.size || props.height || '1rem'};
	background-color: ${({ background }) => background || 'transparent'};
	&:before {
		content: '';
		mask-image: ${({ icon, selected, selectedIcon }) =>
			`url(${selected ? selectedIcon || icon : icon})`};
		mask-size: ${(props) => props.size || '1rem'};
		background-repeat: no-repeat;
		width: ${(props) => props.size || '1rem'};
		background-color: ${({ color, selected, selectedColor }) =>
			selected ? selectedColor || color : color};
		height: ${(props) => props.size || '1rem'};
		position: absolute;
		top: ${(props) => `calc(50% - ${props.size || '1rem'}/2)`};
		left: ${(props) => `calc(50% - ${props.size || '1rem'}/2)`};
	}
`;

export default Icon;
