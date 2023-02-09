export function Pos(x, y) {
    return { x: x, y: y };
}

export function PosEqual(pos1, pos2) {
    return ( pos1.x == pos2.x && pos1.y == pos2.y );
}