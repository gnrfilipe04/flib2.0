import { CircleDTO } from "../dtos/CircleDTO";

export function areEqualsCirclesOverlapping(circle1: CircleDTO, circle2: CircleDTO, circleDiameterOrRadius: number){
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const distanceBetweenCenters = Math.hypot(dx, dy);
    const areOverlapping = distanceBetweenCenters < circleDiameterOrRadius;
    
    return areOverlapping
}